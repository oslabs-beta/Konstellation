import { NextFunction, response } from "express";
import { appendFile } from "fs";
import { nextTick, traceDeprecation } from "process";
import { axios } from "../../types";
import fakeTraceData from "../data/fakeTraceData";
import { IRequest, IResponse } from "../interfaces/IExpress";
import Utils from "../utils/Utils";

const QUERY_URL = 'http://localhost:16686/api/traces?limit=20000&service='

export class TraceModel {
  static requestCount: Number = 0;
  // Add helper fxn to convert epoch time : 
  // var myDate = new Date( your epoch date *1000);
  // document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
  public static getSampleData(req: IRequest, res: IResponse) {
    //   console.log("In Trace Model");
    //   // res.traceData = fakeTraceData;
    return console.log(res.traceData);
  }
  public static async getIndivTrace(req: IRequest, res: IResponse, next: NextFunction) {
    console.log("jaeger indiv query-ing");
    const traceQuery = req.body.traceQuery;
    const response = await fetch('http://localhost:16686/api/traces/' + traceQuery)
    if (!response.ok) {
      throw new Error(`Error retrieving individual trace! Status: ${response.status}`)
    }
    const responseJson = await response.json();
    const indivTraceData: { data: { method: any; } | { response: any; } | { id: any; label: any; type: string; duration: any; }; }[] = [];
    responseJson.data.forEach((trace: any) => {
      const traceID = trace.traceID;
      const traceDuration = trace.duration;
      const traceTags = trace.tags;
      // Need to configure for indiv traces still 
      for (let i = 0; i < traceTags.length; i++) {
        if (traceTags[i].key === 'http.method') {
          const traceMethod = traceTags[i].value;
          indivTraceData.push({
            data: {
              method: traceMethod
            }
          })
        }
        else if (traceTags[i].key === 'http.status_code') {
          const traceResponse = traceTags[i].value;
          indivTraceData.push({
            data: {
              response: traceResponse
            }
          })
        }
      }
      indivTraceData.push({
        data: {
          id: traceID,
          label: traceID,
          type: 'temp',
          duration: traceDuration,
        }
      })
      console.log(indivTraceData)
    })
    res.locals.indivTraceData = indivTraceData;
    return next();
  }
  public static async getTraceLogsFromJaeger(req: IRequest, res: IResponse, next: NextFunction) {
    console.log("jaeger query-ing");
    // const serviceQuery = req.body.service;
    const response = await fetch('http://localhost:16686/api/traces?limit=20000&service=frontend')
    if (!response.ok) {
      throw new Error(`Error retrieving trace! Status: ${response.status}`)
    }
    const responseJson = await response.json();
    const tracesArray: { data: { method: any; } | { response: any; } | { url: string; } | { id: any; label: any; type: string; duration: any; timestamp: any; }; }[] = [];
    // console.log(responseJson);
    console.log('responseJson.data.length: ' + responseJson.data.length)
    // Using forEach renders error: Cannot read properties of undefined (reading 'length') despite responseJson.data.length returning length # value
    for (let i = 0; i < 3; i++){
      const currentTrace = responseJson.data[i];
      const traceID = currentTrace.traceID;
      // setting index to 0 to get origin trace for aggregate traceLog 
      const traceSpans = currentTrace.spans[0];
      const traceDuration = traceSpans.duration;
      const timeStamp = traceSpans.startTime;
      // console.log('traceSpans: ' + traceSpans);
      // console.log('traceDuration: ' + traceDuration);
      // console.log('Spans.Duration: ' + traceSpans.duration);
      // console.log('timeStamp: ' + timeStamp)
      // console.log(traceSpans);
      // need to convert timeStamp from linux t
      // traceSpans[0] to get origin trace data for aggregate trace log; 
      const traceTags = traceSpans.tags;
      console.log('traceTags: '+ traceTags);
      tracesArray.push({
        data: {
          id: traceID,
          label: traceID,
          type: 'temp',
          duration: traceDuration,
          timestamp: timeStamp,
        }
      })
      for (let j = 0; j < traceTags.length; j++) {
        if (traceTags[j].key === 'http.method') {
          const traceMethod = traceTags[j].value;
          tracesArray.push({
            data: {
              method: traceMethod
            }
          })
        }
        else if (traceTags[j].key === 'http.status_code') {
          const traceResponse = traceTags[j].value;
          tracesArray.push({
            data: {
              response: traceResponse
            }
          })
        }
        else if (traceTags[j].key === 'http.url'){
          const traceURL = traceTags[j].value;
          tracesArray.push({
            data: {
              url: traceURL,
            }
          })
        }
      }
      
      // console.log(tracesArray)
    }
  }

  // podName is stored in: data[{processes: p1{ tags[ {where key: 'k8.pod.name', grab value of 'value' key}]}}]
  // query jaeger api with req params 
  // Front end params : specify which service to get traces from 
  // http://localhost:16686/api/traces?limit=20000&service=frontend

  // pass req params into fetch request 
  // store promise from fetch req into res.data 
  // parse through data to store trace data and different keys 
  //

  public static saveDataToTextFile(req: IRequest, res: IResponse) {
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