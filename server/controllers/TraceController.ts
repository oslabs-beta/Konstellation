import { resolveNaptr } from "dns";
import { NextFunction } from "express";
import { appendFile} from 'fs';
import { IResponse } from "../interfaces/IResponse";
import { TraceModel } from "../models/TraceModel";

const express = require('express');


export class TraceController {
  public static counter: number;
  
    constructor() {
        TraceController.counter = 0;
    }

    public static getData(req: Request, res: IResponse, next: NextFunction) {
      TraceModel.getSampleData;
      res.send(res.traceData).json();
    }

    public static saveData (req: Request, res: Response, next: NextFunction): void {
        // console.log(req.socket.remoteAddress); // Use this if not using a server proxy (ex: ngrok)
        // console.log(req.headers['x-forwarded-for']); // Use this if using a server proxy (ex: ngrok)
        //   const logData: any = req.body.traceData ? req.body.traceData : {data: "Example Trace Data From Server"};

        //   appendFile('data.txt', 
        //     `Request from ${req.headers['x-forwarded-for']} @ ${getTimestamp()}\n Included Data: ${logData.data} \n \n`,
        //     function(err) {if (err) return console.log(err)})
        
        //   console.log(``)
        //   console.log(`Request from ${req.headers['x-forwarded-for']} at: ${getTimestamp()} \nIncluded Data: ${logData}`,)
        //   console.log(`${this.counter} requests made since last server restart`);

        //   next();

      }
}