import { NextFunction } from "express";
import { appendFile} from 'fs';

const express = require('express');


export class TraceController {
    public static counter: number;

    constructor() {
        TraceController.counter = 0;
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

  function getTimestamp() {
    let ts = Date.now();
  
    let date_ob = new Date(ts);
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
  
  // prints date & time in YYYY-MM-DD format
   return (year + "-" + month + "-" + date + " at " + hours + ":" + minutes + ":" + seconds);
  }
    }
}