import { appendFile } from "fs";
// import { Http2ServerRequest } from "http2";
// import { nextTick, traceDeprecation } from "process";
// import { axios } from "../../types";
// import fakeTraceData from "../data/fakeTraceData";
// import fakeTraceData2 from "../data/fakeTraceData2";
import { Request, Response, NextFunction } from "express";
import Utils from "../utils/Utils";
import { triggerAsyncId } from "async_hooks";
import { AnyListenerPredicate } from "@reduxjs/toolkit";
import {v4 as uuidv4}  from 'uuid';

// const QUERY_URL = 'http://localhost:16686/api/traces?limit=20000&service='

export class TraceModel {
  static requestCount: Number = 0;
  // Add helper fxn to convert epoch time : 
  // var myDate = new Date( your epoch date *1000);
  // document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
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
    // Using forEach renders error: Cannot read properties of undefined (reading 'length') despite responseJson.data.length returning length # value
    // Uncomment code below for final version to retrieve all trace logs instead of first 3
    // for (let i = 0; i < responseJson.data.length; i++){
    for (let i = 0; i < 3; i++){
      const currentTrace = responseJson.data[i];
      const traceID = currentTrace.traceID;
      // setting index to 0 to get origin trace for aggregate traceLog 
      const traceSpans = currentTrace.spans[0];
      const traceDuration = traceSpans.duration;
      const timeStamp = traceSpans.startTime;
      let traceMethod = 'unknown';
      let traceResponse = 'unknown';
      let traceURL = 'unknown';
      // console.log('traceSpans: ' + traceSpans);
      // console.log('traceDuration: ' + traceDuration);
      // console.log('Spans.Duration: ' + traceSpans.duration);
      // console.log('timeStamp: ' + timeStamp)
      // console.log(traceSpans);
      // need to convert timeStamp from linux t
      // traceSpans[0] to get origin trace data for aggregate trace log; 
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
    // console.log('res.locals.tracesArray: ', tracesArray);
    return next();
  }};
  
  public static async getIndividualTraceView(req: Request, res: Response, next: NextFunction) {
    const traceViewArray = [];
    console.log("jaeger query-ing");
    // const traceID = req.body.traceID;
    // const response = await fetch('http://localhost:16686/api/traces/' + traceID)
    const response = await fetch('http://localhost:16686/api/traces/4b3f58a4fa634084e715b4ac96db9717')
    if (!response.ok) {
      throw new Error(`Error retrieving traceview! Status: ${response.status}`)
    }
    const responseJson = await response.json();
    const currentTraceData = responseJson.data[0]
    const currentTraceSpans = currentTraceData.spans;
    const currentTraceProcesses = currentTraceData.processes;
    // make pods first
    // const podsArray: { data: { id: string; label: any; type: string; }; classes: string; }[] = [];
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
    // associate each span with a process 
    currentTraceSpans.forEach((indivSpan: any) => {
      const currSpan = indivSpan.spanID;
      const currProcess = indivSpan.processID;
      spanToProcess[currSpan] = currProcess;
    });
    // SpanToProcess is dictionary to access which pod each span is referencing
    // console.log(spanToProcess)
    // Make Edges below
    // Can we reduce time complexity of this? Possibly refactor to combine with spanToProcess to reduce iteration on traceSpans 
    // const edgesArray: { data: { source: any; target: any; type: string; label: any; }; classes: string; }[] = [];
    // For some reason, forEach on currentTraceSpans is returning an error here despite being used above to generate spanToProcess
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
    // console.log(traceViewArray);
    res.locals.traceViewArray = traceViewArray;
    console.log('traceviewArray: ', traceViewArray);
    return next();
  }

  public static async getIndividualPodData(req: Request, res: Response, next: NextFunction) {
    const traceViewArray = [];
    console.log("jaeger query-ing");
    const processTarget = req.body.processTarget;
    // const traceID = req.body.traceID;
    // const response = await fetch('http://localhost:16686/api/traces/' + traceID)
    const response = await fetch('http://localhost:16686/api/traces/fac23e04baca3badb014d7e063507cd3')
    if (!response.ok) {
      throw new Error(`Error retrieving traceview! Status: ${response.status}`)
    }
    const responseJson = await response.json();
    const currentTraceData = responseJson.data[0]
    const currentTraceSpans = currentTraceData.spans;
    type SpanCache = {[key: string] : string}
    const spanToProcess: SpanCache = {};
    // associate each span with a process 
    currentTraceSpans.forEach((indivSpan: any) => {
      const currSpan = indivSpan.spanID;
      const currProcess = indivSpan.processID;
      spanToProcess[currSpan] = currProcess;
    });
    // SpanToProcess is dictionary to access which pod each span is referencing
    // console.log(spanToProcess)
    // processSpecificSpans is looping throuh all spans & accessing it by reverse now, so that when we click on a node, it will reutrn the different spans associated with that process 
    const processSpecificSpans = [];
    for (let span in spanToProcess) {
      if (spanToProcess[span] === processTarget)
        processSpecificSpans.push(span);
    }
    res.locals.processSpecificSpans = processSpecificSpans;
    return next();
  }
  public static getIndivSpanDetails(req: Request, res:Response, next:NextFunction){
    const currentSpanIdObj = res.locals.spanID;
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
    for (let key in currentSpanIdObj){
      if (key === 'operationName') operationName = currentSpanIdObj[key]
      else if (key === 'references') references = currentSpanIdObj[key]
      else if (key === 'startTime') startTime = currentSpanIdObj[key]
      else if (key === 'duration') duration = currentSpanIdObj[key]
      else if (key === 'tags') spanTags = currentSpanIdObj[key]
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
  }
  // public static async getSpanDetails(req: Request, res: Response, next: NextFunction) {
  //   const spanDetails = [];
  //   console.log("retrieving spanDetails");
  //   // Refactor to pass in trace currentTraceSpans from previous middleware instead of making call &iterating again 
  //   const spanTarget = req.body.spanTarget
  //   // const traceID = req.body.traceID;
  //   // const response = await fetch('http://localhost:16686/api/traces/' + traceID)
  //   const response = await fetch('http://localhost:16686/api/traces/fac23e04baca3badb014d7e063507cd3')
  //   if (!response.ok) {
  //     throw new Error(`Error retrieving traceview! Status: ${response.status}`)
  //   }
  //   const responseJson = await response.json();
  //   const currentTraceData = responseJson.data[0]
  //   const currentTraceSpans = currentTraceData.spans;
  //   for (let i = 0; i < currentTraceSpans; i ++){
  //     if (currentTraceSpans[i].spanID === spanTarget){
  //       const currentSpan = currentTraceSpans[i];
  //       for (let spanDetail in currentSpan){
  //         const operationName = spanDetail[operationName];
  //         const references = spanDetail[references];
  //         const startTime = spanDetail[startTime];
  //         const duration = spanDetail[duration];
  //         const spanTags = spanDetail[tags];
  //         // spanTags.forEach((indivTag) => {
  //         //   if (indivTag.key === 'http.method'){
  //         //     const httpMethod = indivTag.value;
  //         //   }
  //         //   else if (indivTag.key === 'http.url'){
  //         //     const httpUrl = indivTag.value;
  //         //   }
  //         //   else if (indivTag.key === 'http.target'){
  //         //     const httpTarget = indivTag.value;
  //         //   }
  //         //   else if (indivTag.key === 'http.status_code'){
  //         //     const httpStatusCode = indivTag.value;
  //         //   }
  //         // })
  //         // spanDetails.push({
  //         //   data: {
  //         //     operationName: operationName,
  //         //     references: references,
  //         //     startTime: startTime,
  //         //     duration: duration,
  //         //     httpMethod: httpMethod,
  //         //     httpUrl: httpUrl,
  //         //     httpTarget: httpTarget,
  //         //     httpStatusCode: httpStatusCode,
  //         //   }
  //         // })
  //       // }
  //       // res.locals.spanDetails = spanDetails;
  //       // return next();
  //     }
  //   }
  // }
  // }

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