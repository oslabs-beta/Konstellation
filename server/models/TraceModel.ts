import { appendFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { SpanCache, TraceViewPodsData } from '../types/Types';
import { Request, Response, NextFunction } from 'express';
import Utils from '../utils/Utils';

export class TraceModel {
  static requestCount = 0;
  public static async getTraceLogsFromJaeger(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log('jaeger query-ing');

    // µs = microseconds
    const µsPerDay = 86400000000;
    const µsPerHour = 3600000000;
    const µsPerMinute = 60000000;

    const nowInµs = Date.now() * 1000;

    let startInµs;
    switch (req.params.lookback) {
    case '2d':
      startInµs = nowInµs - µsPerDay * 2;
      break;
    case '1d':
      startInµs = nowInµs - µsPerDay;
      break;
    case '12h':
      startInµs = nowInµs - µsPerHour * 12;
      break;
    case '4h':
      startInµs = nowInµs - µsPerHour * 4;
      break;
    case '2h':
      startInµs = nowInµs - µsPerHour * 2;
      break;
    case '1h':
      startInµs = nowInµs - µsPerHour * 1;
      break;
    case '30m':
      startInµs = nowInµs - µsPerMinute * 30;
      break;
    case '15m':
      startInµs = nowInµs - µsPerMinute * 15;
      break;
    case '10m':
      startInµs = nowInµs - µsPerMinute * 10;
      break;
    case '5m':
      startInµs = nowInµs - µsPerMinute * 5;
      break;
    case '2m':
      startInµs = nowInµs - µsPerMinute * 2;
      break;
    case '1m':
      startInµs = nowInµs - µsPerMinute * 1;
      break;
    }

    const url = `http://localhost:16686/api/traces?end=${nowInµs}&limit=20000&service=
    ${req.params.service}&lookback=${req.params.lookback}&start=${startInµs}`;

    try {
      console.log('FETCHING JAEGER from: ' + url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error retrieving trace! Status: ${response.status}`);
      }
      const responseJson = await response.json();
      const tracesArray: {
        data:
          | { method: any }
          | { response: any }
          | { url: string }
          | {
              id: any;
              label: any;
              type: string;
              duration: any;
              timestamp: any;
            };
      }[] = [];
      console.log('responseJson.data.length: ' + responseJson.data.length);
      for (let i = 0; i < responseJson.data.length; i++) {
        const currentTrace = responseJson.data[i];
        const traceID = currentTrace.traceID;
        // setting index to 0 to get origin trace for aggregate traceLog
        const traceSpans = currentTrace.spans[0];
        const traceDuration = traceSpans.duration;
        const timeStamp = traceSpans.startTime;
        let traceMethod = 'unknown';
        let traceResponse = 'unknown';
        let traceURL = 'unknown';

        // need to convert timeStamp from linux t
        // traceSpans[0] to get origin trace data for aggregate trace log;
        const traceTags = traceSpans.tags;
        for (let j = 0; j < traceTags.length; j++) {
          if (
            traceTags[j].key === 'http.method' ||
            traceTags[j].key === 'rpc.method'
          ) {
            traceMethod = traceTags[j].value;
          } else if (
            traceTags[j].key === 'http.status_code' ||
            traceTags[j].key === 'rpc.grpc.status_code'
          ) {
            traceResponse = traceTags[j].value;
          } else if (traceTags[j].key === 'http.url') {
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
            timestamp: new Date(timeStamp / 1000).toString(),
          },
        });
      }
      console.log(tracesArray);
      res.locals.tracesArray = tracesArray;
      return next();
    } catch (err) {
      console.log('TraceModel.getTraceLogsFromJaeger:\n' + err);
    }
  }

  public static async getIndividualTraceView(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const traceViewArray = [];
    console.log('jaeger query-ing');
    const traceID = req.params.traceId;

    try {
      const response = await fetch(
        'http://localhost:16686/api/traces/' + traceID
      );
      if (!response.ok) {
        throw new Error(
          `Error retrieving traceview! Status: ${response.status}`
        );
      }
      const responseJson = await response.json();
      const currentTraceData = responseJson.data[0];
      const currentTraceSpans = currentTraceData.spans;
      const currentTraceProcesses = currentTraceData.processes;
      for (const process in currentTraceProcesses) {
        const currProcess = currentTraceProcesses[process];
        const currProcessTags = currProcess.tags;
        for (let i = 0; i < currProcessTags.length; i++) {
          if (currProcessTags[i].key === 'k8s.pod.name')
            traceViewArray.push({
              data: {
                id: process,
                label: currProcessTags[i].value,
                type: 'trace',
              },
              classes: 'label',
            });
        }
      }
      type SpanCache = { [key: string]: string };
      const spanToProcess: SpanCache = {};
      currentTraceSpans.forEach((indivSpan: any) => {
        const currSpan = indivSpan.spanID;
        const currProcess = indivSpan.processID;
        spanToProcess[currSpan] = currProcess;
      });

      // Currently will generate an undefined for source when it is a trace following from another trace; 
      // that trace origin pod information is not self sustained in this specific traceOr data, will need to 
      // retrieve elsewhere / off screen, as it is beyond scope of this current trace

      for (let k = 0; k < currentTraceSpans.length; k++) {
        const indivSpan = currentTraceSpans[k];
        if (indivSpan.references[0]) {
          if (
            spanToProcess[indivSpan.spanID] !==
            spanToProcess[indivSpan.references[0].spanID]
          ) {
            traceViewArray.push({
              data: {
                id: uuidv4(),
                source: spanToProcess[indivSpan.spanID],
                target: spanToProcess[indivSpan.references[0].spanID],
                type: 'arrow',
                label: indivSpan.duration,
              },
              classes: 'background',
            });
          }
        }
      }
      res.locals.spanToProcess = spanToProcess;
      res.locals.traceViewArray = traceViewArray;
      res.locals.currentTraceSpans = currentTraceSpans;
      return next();
    } catch (err) {
      console.log(err);
    }
  }

  public static async getSearchBarTraceView(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const currentTraceSpans = res.locals.currentTraceSpans;
    const traceViewArray = res.locals.traceViewArray;
    let spanCountData = 0;
    let traceID;
    let traceStart = 0;
    let traceDuration = 0;
    currentTraceSpans.forEach((indivSpan: any) => {
      spanCountData++;
      if (indivSpan.references[0]) {
        const currRef = indivSpan.references[0];
        if (currRef.refType === 'FOLLOWS_FROM') {
          traceID = indivSpan.traceID;
          traceStart = indivSpan.startTime;
          traceDuration = indivSpan.duration;
        }
      }
    });
    const searchTraceData: TraceViewPodsData = {
      data: {
        id: 'searchBarData',
        type: 'searchBarData',
        traceID: traceID,
        traceStart: new Date(traceStart / 1000).toString(),
        traceDuration: `${traceDuration / 1000} ms`,
        serviceCount: traceViewArray.length,
        spanCount: spanCountData,
        label: undefined,
      },
      classes: 'label',
    };
    res.locals.searchBarTraceView = searchTraceData;
    return next();
  }
  // Want to pass back id when calling individual PodData; will contain the process #
  public static async getIndividualPodData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log('req.params: ', req.params);
    const processTarget = req.params.processTarget;
    const traceID = req.params.traceId;
    const url = 'http://localhost:16686/api/traces/' + traceID;
    console.log(`fetching this url: ${url}`);
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log('responseJSON: ', responseJson);
      const currentTraceData = responseJson.data[0];
      const currentTraceSpans = currentTraceData.spans;
      type SpanData = SpanCache[];
      const spanToProcess: SpanData = [];
      currentTraceSpans.forEach((indivSpan: any) => {
        console.log('indivSpan.spanID: ', indivSpan.spanID);
        console.log('indivSpan.processID: ', indivSpan.processID);
        const currSpan = indivSpan.spanID;
        const currProcess = indivSpan.processID;
        spanToProcess.push({
          processNum: currProcess,
          spanIds: currSpan,
          spanData: indivSpan,
        });
      });
      const proccessSpecificSpans: string | any[] = [];
      spanToProcess.forEach((element) => {
        if (element.processNum === processTarget)
          proccessSpecificSpans.push(element);
      });
      res.locals.processSpecificSpans = proccessSpecificSpans;
      return next();
    } catch (err) {
      console.log(err);
    }
  }

  public static getIndivSpanDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log('getIndivSpanDetails Params: ', req.params);
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
    for (const key in currentSpanIdObj) {
      if (key === 'operationName') operationName = currentSpanIdObj[key];
      else if (key === 'references') references = currentSpanIdObj[key];
      else if (key === 'startTime') startTime = currentSpanIdObj[key];
      else if (key === 'duration') duration = currentSpanIdObj[key];
      else if (key === 'tags') spanTags = currentSpanIdObj[key];
      else if (key === 'spanID') spanID = currentSpanIdObj[key];
      else if (key === 'traceID') traceID = currentSpanIdObj[key];
    }
    spanTags.forEach(
      (indivTag: { key: string; type: string; value: string }) => {
        if (indivTag.key === 'http.host') httpHost = indivTag.value;
        else if (indivTag.key === 'http.method') httpMethod = indivTag.value;
        else if (indivTag.key === 'http.target') httpTarget = indivTag.value;
        else if (indivTag.key === 'http.url') httpUrl = indivTag.value;
        else if (indivTag.key === 'rpcMethod') rpcMethod = indivTag.value;
        else if (indivTag.key === 'rpcGrpcStatusCode')
          rpcGrpcStatusCode = indivTag.value;
      }
    );
    const indivSpanArray = [];
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
        rpcGrpcStatusCode: rpcGrpcStatusCode,
      },
    });
    res.locals.indivSpanDetails = indivSpanArray;
  }

  public static async getTraceViewServices(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log('in get traceview services');
    try {
      const response = await fetch('http://localhost:16686/api/services');
      if (!response.ok) {
        throw new Error(
          `Error retrieving traceview! Status: ${response.status}`
        );
      }
      const responseJson = await response.json();
      res.locals.traceViewServices = responseJson.data;
      return next();
    } catch (err) {
      console.log(err);
    }
  }
  public static saveDataToTextFile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const logData: any = req.body.traceData
      ? req.body.traceData
      : { data: 'Example Trace Data From Server' };

    appendFile(
      'data.txt',
      `Request from ${
        req.headers['x-forwarded-for']
      } @ ${Utils.getTimestamp()}\n Included Data: ${logData.data} \n \n`,
      function (err) {
        if (err) return console.log(err);
      }
    );

    console.log('');
    console.log(
      `Request from ${
        req.headers['x-forwarded-for']
      } at: ${Utils.getTimestamp()} \nIncluded Data: ${logData}`
    );
    console.log(`${this.requestCount} requests made since last server restart`);
  }
}
