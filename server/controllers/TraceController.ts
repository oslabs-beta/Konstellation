import { resolveNaptr } from "dns";
import { appendFile} from 'fs';
import { Request, Response, NextFunction } from 'express';
import { TraceModel } from "../models/TraceModel";
import Utils from "../utils/Utils";

export class TraceController {

    public static getAggregateData(req: Request, res: Response, next: NextFunction) {
      try{
        console.log("In Tracecontroller");
        TraceModel.getTraceLogsFromJaeger(req, res, next);
      }
      catch(err) {
        return next({
          log: `Error in TraceController.getCluster: ${err}`,
          status: 500,
          message: {
            err: 'Error occured while retrieving Aggregate Trace Data in TraceController',
          },
        });
      }
    }
    public static getSearchBarTraceView(req: Request, res: Response, next: NextFunction) {
      try{
        console.log("In Tracecontroller");
        TraceModel.getSearchBarTraceView(req, res, next);
      }
      catch(err) {
        return next({
          log: `Error in TraceController.getCluster: ${err}`,
          status: 500,
          message: {
            err: 'Error occured while retrieving search bar trace data in TraceController',
          },
        });
      }
    }
    

    public static getTraceViewData(req: Request, res: Response, next: NextFunction) {
      try{
        console.log("In Tracecontroller");
        TraceModel.getIndividualTraceView(req, res, next);
      }
      catch(err) {
        return next({
          log: `Error in TraceController.getCluster: ${err}`,
          status: 500,
          message: {
            err: 'Error occured while retrieving Trace View Data in TraceController',
          },
        });
      }
    }
    public static getPodDetails(req: Request, res: Response, next: NextFunction) {
      try{
        console.log("In Tracecontroller");
        TraceModel.getIndividualPodData(req, res, next);
      }
      catch(err) {
        return next({
          log: `Error in TraceController.getCluster: ${err}`,
          status: 500,
          message: {
            err: 'Error occured while retrieving Trace Pod Data in TraceController',
          },
        });
      }
    }
    // public static getSpanDetails(req: Request, res: Response, next: NextFunction) {
    //   try{
    //     console.log("In Tracecontroller");
    //     TraceModel.getIndivSpanDetails(req, res, next);
    //   }
    //   catch(err) {
    //     return next({
    //       log: `Error in TraceController.getCluster: ${err}`,
    //       status: 500,
    //       message: {
    //         err: 'Error occured while retrieving Span Details Data in TraceController',
    //       },
    //     });
    //   }
    // }
    // public static saveData (req: Request, res: Response, next: NextFunction) {
    //       TraceModel.saveDataToTextFile(req, res);
    //       next();
    //   }
}