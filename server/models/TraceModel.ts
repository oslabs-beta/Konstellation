import { NextFunction } from "express";
import { IResponse } from "../interfaces/IResponse";

export class TraceModel {
  
  public static getSampleData(req: Request, res: IResponse, next: NextFunction) {
    res.traceData = [
      {
      data: {
        source: 'apple-pod',
        target: 'pod2',
        type: 'arrow'
      }
    },
      {
        data: {
          source: 'pod1',
          target: 'pod3',
          type: 'arrow',
        }
      },
      {
        data: {
          id: 'someId',
          label: 'someId',
          type: 'pod',
        }
      }
    ]
  }

  public static getDataFromJaeger(req: Request, res: IResponse, next: NextFunction) {

  }
}