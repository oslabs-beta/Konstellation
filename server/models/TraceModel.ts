import { NextFunction, response } from "express";
import { appendFile } from "fs";
import { traceDeprecation } from "process";
import { axios } from "../../types";
import fakeTraceData from "../data/fakeTraceData";
import { IRequest, IResponse } from "../interfaces/IExpress";
import Utils from "../utils/Utils";

const QUERY_URL = 'http://localhost:16686/api/traces?limit=20000&service='

export class TraceModel {
  static requestCount:Number = 0;

  public static getSampleData(req: IRequest, res: IResponse) {
  //   console.log("In Trace Model");
  //   // res.traceData = fakeTraceData;
    return console.log(res.traceData);
  }
  public static async getIndivTrace(req: IRequest, res: IResponse){
  
  }
  public static async getTraceLogsFromJaeger(req: IRequest, res: IResponse) {
    console.log("jaeger query-ing");
    // const serviceQuery = req.body.service;
    const response = await fetch('http://localhost:16686/api/traces?limit=20000&service=frontend')
    if (!response.ok){
      throw new Error(`Error retrieving trace! Status: ${response.status}`)
    }
    const responseJson = await response.json();
    const tracesArray = [];
    responseJson.data.forEach((trace: any) => {
      const traceID = trace.traceID;
      const traceDuration = trace.duration;
      const traceTags = trace.tags; 
      for (let i = 0; i < traceTags.length; i ++){
        if (traceTags[i].key === 'http.method') const traceMethod = traceTags[i].value;
        else if (traceTags[i].key === 'http.status_code') const traceResponse = traceTags[i].value;
        }
      };
      tracesArray.push({
        data: {
          id: traceID,
          label: traceID,
          type: 'temp',
          duration: traceDuration,
          response: traceResponse,
          method: traceMethod,
        }
      })
  }
    

    // podName is stored in: data[{processes: p1{ tags[ {where key: 'k8.pod.name', grab value of 'value' key}]}}]
    // data.data.forEach((indivTrace: any) => {
      // traceArray.push(indivTrace);
      // console.log(traceArray)
    // })

    // fetch(QUERY_URL + serviceQuery)
    
      // .then(response => console.log(response))
    return res.sendStatus(200)
    // query jaeger api with req params 
    // Front end params : specify which service to get traces from 
    // http://localhost:16686/api/traces?limit=20000&service=frontend

    // pass req params into fetch request 
    // store promise from fetch req into res.data 
    // parse through data to store trace data and different keys 
    //
  }

  public static saveDataToTextFile(req: IRequest, res: IResponse) {
    // console.log(req.socket.remoteAddress); // Use this if not using a server proxy (ex: ngrok)
    // console.log(req.headers['x-forwarded-for']); // Use this if using a server proxy (ex: ngrok)
    const logData: any = req.body.traceData ? req.body.traceData : {data: "Example Trace Data From Server"};

    appendFile('data.txt', 
      `Request from ${req.headers['x-forwarded-for']} @ ${Utils.getTimestamp()}\n Included Data: ${logData.data} \n \n`,
      function(err) {if (err) return console.log(err)})
  
    console.log(``)
    console.log(`Request from ${req.headers['x-forwarded-for']} at: ${Utils.getTimestamp()} \nIncluded Data: ${logData}`,)
    console.log(`${this.requestCount} requests made since last server restart`);
  }
}