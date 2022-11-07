import { resolveNaptr } from "dns";
import { NextFunction } from "express";
import { appendFile} from 'fs';
import { IRequest, IResponse, INextFunction } from "../interfaces/IExpress";
import { TraceModel } from "../models/TraceModel";
import Utils from "../utils/Utils";

const express = require('express');


export class TraceController {

    public static getAggregateData(req: IRequest, res: IResponse, next: INextFunction) {
      console.log("In Tracecontroller");
      TraceModel.getTraceLogsFromJaeger(req, res, next);
      next();
    }
    // public static getTraceViewData(req: IRequest, res: IResponse, next: INextFunction) {
    //   console.log("In Tracecontroller");
    //   TraceModel.getIndividualTraceView(req, res, next);
    //   next();
    // }
    // public static getPodDetails(req: IRequest, res: IResponse, next: INextFunction) {
    //   console.log("In Tracecontroller");
    //   TraceModel.getIndividualPodData(req, res, next);
    //   next();
    // }
    // public static getSpanDetails(req: IRequest, res: IResponse, next: INextFunction) {
    //   console.log("In Tracecontroller");
    //   TraceModel.getSpanDetails(req, res, next);
    //   next();
    // }
    public static saveData (req: IRequest, res: IResponse, next: INextFunction): void {
          TraceModel.saveDataToTextFile(req, res);
          next();
      }
}