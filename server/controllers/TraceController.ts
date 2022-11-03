import { resolveNaptr } from "dns";
import { NextFunction } from "express";
import { appendFile} from 'fs';
import { IRequest, IResponse, INextFunction } from "../interfaces/IExpress";
import { TraceModel } from "../models/TraceModel";
import Utils from "../utils/Utils";

const express = require('express');


export class TraceController {

    // public static getData(req: IRequest, res: IResponse, next: INextFunction) {
    //   TraceModel.getSampleData;
    //   next();
    // }
		  public static getData(req: IRequest, res: IResponse, next: INextFunction) {
				if (req.params){

					TraceModel.getDataFromJaeger;
					next();
				}
				else if (req.query){
					TraceModel.queryJaeger;
					next();
				}
    }

    public static saveData (req: IRequest, res: IResponse, next: INextFunction): void {
          TraceModel.saveDataToTextFile(req, res);
          next();
      }
}