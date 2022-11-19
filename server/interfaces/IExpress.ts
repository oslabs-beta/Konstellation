import { Request, Response, NextFunction } from 'express';

export interface IRequest extends Request {}

export interface IResponse extends Response {
  locals: any;
  traceData: TraceData;
}

export interface INextFunction extends NextFunction {}
