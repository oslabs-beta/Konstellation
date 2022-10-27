export interface IResponse extends Response {
  locals: any;
  traceData: TraceData;
}