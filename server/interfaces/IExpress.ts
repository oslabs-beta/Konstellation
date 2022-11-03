import { Request, Response, NextFunction } from 'express';

export interface IRequest extends Request { 
	params: any;
	body: any;
	headers: any;
	query: any;
}

export interface IResponse extends Response {
  locals: any;
  traceData: TraceData;
}

export interface INextFunction extends NextFunction {}