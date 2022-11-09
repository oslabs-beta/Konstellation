export type SpanCache = {
    processNum:string,
    spanIds: Array<string>
  };

export type EdgeData = {
    data: {
        source: string,
        target: string,
        type: 'arrow',
        label: any,
    },
        classes: 'background'
   };

export type SpanData = {
    data: {
      operationName: string,
      references: string,
      startTime: string,
      duration: string,
      spanTags: [],
      httpHost: string,
      httpMethod: string,
      httpTarget: string,
      httpUrl: string,
      rpcMethod: string,
      rpcGrpcStatusCode: string
    }
  };

export type TraceLogData = {
    data: {
     id: string,
     label: string,
     type: string,
     duration: number,
     response: number,
     method: string,
     url: string,
    }
 };

export type TraceViewPodsData = {
    data: {
      id: string,
      type: string,
      traceID?: string,
      traceStart? : string,
      traceDuration? : string,
      serviceCount? : number,
      spanCount? : number,
      label: any,
    }
    classes: 'label'
}



