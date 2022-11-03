import { NextFunction } from "express";
import { appendFile } from "fs";
import fakeTraceData from "../data/fakeTraceData";
import { IRequest, IResponse } from "../interfaces/IExpress";
import Utils from "../utils/Utils";

export class TraceModel {
  static requestCount:Number = 0;

  public static getSampleData(req: IRequest, res: IResponse) {
    res.traceData = fakeTraceData;
  }

  public static getDataFromJaeger(req: IRequest, res: IResponse) {
    //use the req.params.traceId to retrieve teh trace id
		//send a get request to http://localhost:16686/api/traces/<traceId>
		//once we get the data. we want to process the data. We want the source pod, target pod, type, (arrow?),
		//it will be an array with x amount of elements. should also retrieve duration data in the traces
		//each element will be an object with a data property.
    const traceId: string = req.params.traceId //this sets the trace id to a variable
		const requestString: string = `http://localhost:16686/api/traces/${traceId}`;
		fetch(requestString)
		.then((response) => response.json())
		.then(data => {
			console.log("data from jaeger", data);
			
		})


  }

	public static queryJaeger(req: IRequest, res: IResponse){
    const podName = req.query.podName
		
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