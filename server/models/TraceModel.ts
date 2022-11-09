import { appendFile } from "fs";
import {v4 as uuidv4}  from 'uuid';
import {SpanCache, TraceViewPodsData} from '../types/Types'
import { Request, Response, NextFunction } from "express";
import Utils from "../utils/Utils";

export class TraceModel {
  static requestCount: Number = 0;
// Currently set to only retrieve first 3, when complete, will want to pass in service name, lookbackParam 
   // final fetch call should be line below
      // const response = await fetch('http://localhost:16686/api/traces?limit=20000&service=' + serviceQuery + '&lookback=' + lookbackParam)
  public static async getTraceLogsFromJaeger(req: Request, res: Response, next: NextFunction) {
    console.log("jaeger query-ing");
    // const serviceQuery = req.body.service;
    // const lookbackParam = req.body.lookbackParam; 
    // Can limit results by changing results, currently set to 20000 results shown. 
    const response = await fetch('http://localhost:16686/api/traces?limit=20000&service=frontend')
    if (!response.ok) {
      throw new Error(`Error retrieving trace! Status: ${response.status}`)
    }
    const responseJson = await response.json();
    const tracesArray: { data: { method: any; } | { response: any; } | { url: string; } | { id: any; label: any; type: string; duration: any; timestamp: any; }; }[] = [];
    console.log('responseJson.data.length: ' + responseJson.data.length)
    // Uncomment code below for final version to retrieve all trace logs instead of first 3
    // for (let i = 0; i < responseJson.data.length; i++){
    for (let i = 0; i < 3; i++){
      const currentTrace = responseJson.data[i];
      const traceID = currentTrace.traceID;
      const traceSpans = currentTrace.spans[0];
      const traceDuration = traceSpans.duration;
      const timeStamp = traceSpans.startTime;
      let traceMethod = 'unknown';
      let traceResponse = 'unknown';
      let traceURL = 'unknown';
      const traceTags = traceSpans.tags;
      for (let j = 0; j < traceTags.length; j++) {
        if (traceTags[j].key === 'http.method' || traceTags[j].key === 'rpc.method') {
          traceMethod = traceTags[j].value;
        }
        else if (traceTags[j].key === 'http.status_code'|| traceTags[j].key === 'rpc.grpc.status_code') {
          traceResponse = traceTags[j].value;
          }
        else if (traceTags[j].key === 'http.url'){
          traceURL = traceTags[j].value;
        }
      }
      tracesArray.push({
        data: {
          id: traceID,
          label: traceID,
          type: 'temp',
          response: traceResponse,
          method: traceMethod,
          url: traceURL,
          duration: traceDuration,
          timestamp: timeStamp,
        }
      })
    console.log(tracesArray);
    res.locals.tracesArray = tracesArray;
    return next();
  }};
  
  public static async getIndividualTraceView(req: Request, res: Response, next: NextFunction) {
    const traceViewArray = [];
    console.log("jaeger query-ing");
    const traceID = req.body.traceID;
    const response = await fetch('http://localhost:16686/api/traces/' + traceID)
    if (!response.ok) {
      throw new Error(`Error retrieving traceview! Status: ${response.status}`)
    }
    const responseJson = await response.json();
    const currentTraceData = responseJson.data[0];
    const currentTraceSpans = currentTraceData.spans;
    const currentTraceProcesses = currentTraceData.processes;
    for (const process in currentTraceProcesses){
      const currProcess = currentTraceProcesses[process];
      const currProcessTags = currProcess.tags;
      for (let i = 0; i < currProcessTags.length; i++){
        if (currProcessTags[i].key === 'k8s.pod.name')
        traceViewArray.push({
          data: {
            id: process,
            label: currProcessTags[i].value,
            type: 'trace',
          },
          classes: 'label'
        })
      }
    }
    type SpanCache = {[key: string] : string}
    const spanToProcess: SpanCache = {};
    currentTraceSpans.forEach((indivSpan: any) => {
      const currSpan = indivSpan.spanID;
      const currProcess = indivSpan.processID;
      spanToProcess[currSpan] = currProcess;
    });
    
    // Currently will generate an undefined for source when it is a trace following from another trace; that trace origin pod information is not self sustained in this specific traceOr data, will need to retrieve elsewhere / off screen, as it is beyond scope of this current trace
  
    for (let k = 0; k < currentTraceSpans.length; k++){
      let indivSpan = currentTraceSpans[k];
      if (spanToProcess[indivSpan.spanID] !== spanToProcess[indivSpan.references[0].spanID]){
        traceViewArray.push({
          data: {
            id: uuidv4(),
            source: spanToProcess[indivSpan.spanID],
            target: spanToProcess[indivSpan.references[0].spanID],
            type: 'arrow',
            label: indivSpan.duration,
          },
          classes: 'background'
        })
      };
    }
    res.locals.spanToProcess = spanToProcess;
    res.locals.traceViewArray = traceViewArray;
    res.locals.currentTraceSpans = currentTraceSpans;
    console.log('traceviewArray: ', traceViewArray);
    return next();
  }

  public static async getSearchBarTraceView(req: Request, res: Response, next: NextFunction){
    const currentTraceSpans = res.locals.currentTraceSpans;
    const traceViewArray = res.locals.traceViewArray
    let spanCountData = 0;
    let traceID;
    let traceStart;
    let traceDuration;
    currentTraceSpans.forEach((indivSpan: any) => {
      spanCountData ++; 
      const currRef = indivSpan.references[0];
      if (currRef.refType === "FOLLOWS_FROM") {
        console.log('follows from: ' + indivSpan.traceID);
        traceID = indivSpan.traceID;
        traceStart = indivSpan.startTime;
        traceDuration = indivSpan.duration;
      }
    });
    const searchTraceData : TraceViewPodsData = {
      data: {
        id: "searchBarData",
        type: "searchBarData",
        traceID: traceID,
        traceStart: traceStart,
        traceDuration: traceDuration,
        serviceCount: traceViewArray.length,
        spanCount: spanCountData,
        label: undefined
      },
      classes: "label"
    }
    console.log('spanCountData', spanCountData);
    console.log(searchTraceData) 
    res.locals.searchBarTraceView = searchTraceData;
    return next();
  }
  // Want to pass back id when calling individual PodData; will contain the process # 
  public static async getIndividualPodData(req: Request, res: Response, next: NextFunction) {
    const processTarget = req.body.processTarget;
    // const traceID = req.body.traceID;
    const response = await fetch('http://localhost:16686/api/traces/f4693c25923823dae91e7f1e4a2c8862')
    if (!response.ok) {
      throw new Error(`Error retrieving traceview! Status: ${response.status}`)
    }
    const responseJson = await response.json();
    const currentTraceData = responseJson.data[0];
    const currentTraceSpans = currentTraceData.spans;
    type SpanData = SpanCache[];
    const spanToProcess: SpanData = [];
    currentTraceSpans.forEach((indivSpan: any) => {
      console.log('indivSpan.spanID: ', indivSpan.spanID);
      console.log('indivSpan.processID: ', indivSpan.processID);
      const currSpan = indivSpan.spanID;
      const currProcess = indivSpan.processID;
      spanToProcess.push(
        {
          processNum: currProcess,
          spanIds: currSpan,
          spanData: indivSpan,
        });
      })
    console.log('spanToProcess: ', spanToProcess);
    const proccessSpecificSpans : string | any[] = [];
    spanToProcess.forEach((element) => {
      if (element.processNum === processTarget) proccessSpecificSpans.push(element.spanIds)
    })
    res.locals.processSpecificSpans = proccessSpecificSpans;
    return next();
  }

  public static getIndivSpanDetails(req: Request, res:Response, next:NextFunction){
    const currentSpanIdObj = req.body.spanData;
    let operationName: any;
    let references: any;
    let startTime: any;
    let duration: any;
    let spanTags: any;
    let httpHost: any;
    let httpMethod: any;
    let httpTarget: any;
    let httpUrl: any;
    let rpcMethod: any;
    let rpcGrpcStatusCode: any;
    let spanID: any;
    let traceID: any;
    for (let key in currentSpanIdObj){
      if (key === 'operationName') operationName = currentSpanIdObj[key]
      else if (key === 'references') references = currentSpanIdObj[key]
      else if (key === 'startTime') startTime = currentSpanIdObj[key]
      else if (key === 'duration') duration = currentSpanIdObj[key]
      else if (key === 'tags') spanTags = currentSpanIdObj[key]
      else if (key === 'spanID') spanID = currentSpanIdObj[key]
      else if (key === 'traceID') traceID = currentSpanIdObj[key]
    }
    spanTags.forEach((indivTag: {key: string, type: string, value: string}) => {
      if (indivTag.key === 'http.host') httpHost = indivTag.value;
      else if (indivTag.key === 'http.method') httpMethod = indivTag.value;
      else if (indivTag.key === 'http.target') httpTarget = indivTag.value;
      else if (indivTag.key === 'http.url') httpUrl = indivTag.value;
      else if (indivTag.key === 'rpcMethod') rpcMethod = indivTag.value;
      else if (indivTag.key === 'rpcGrpcStatusCode') rpcGrpcStatusCode = indivTag.value;
    })
    const indivSpanArray = []
    indivSpanArray.push({
        data: {
          id: uuidv4(),
          operationName: operationName,
          references: references,
          startTime: startTime,
          duration: duration,
          spanTags: [],
          httpHost: httpHost,
          httpMethod: httpMethod,
          httpTarget: httpTarget,
          httpUrl: httpUrl,
          rpcMethod: rpcMethod,
          rpcGrpcStatusCode: rpcGrpcStatusCode
        }
      })
    res.locals.indivSpanDetails = indivSpanArray;
  }

  public static async getTraceViewServices(req: Request, res:Response, next:NextFunction){
    const response = await fetch('http://localhost:16686/api/services')
    if (!response.ok) {
      throw new Error(`Error retrieving traceview! Status: ${response.status}`)
    };
    const responseJson = await response.json();
    res.locals.traceViewServices = responseJson.data;
    console.log(res.locals.traceViewServices);
    return next();
  }
  public static saveDataToTextFile(req: Request, res: Response, next: NextFunction) {
    // console.log(req.socket.remoteAddress); // Use this if not using a server proxy (ex: ngrok)
    // console.log(req.headers['x-forwarded-for']); // Use this if using a server proxy (ex: ngrok)
    const logData: any = req.body.traceData ? req.body.traceData : { data: "Example Trace Data From Server" };

    appendFile('data.txt',
      `Request from ${req.headers['x-forwarded-for']} @ ${Utils.getTimestamp()}\n Included Data: ${logData.data} \n \n`,
      function (err) { if (err) return console.log(err) })

    console.log(``)
    console.log(`Request from ${req.headers['x-forwarded-for']} at: ${Utils.getTimestamp()} \nIncluded Data: ${logData}`,)
    console.log(`${this.requestCount} requests made since last server restart`);
  }
}