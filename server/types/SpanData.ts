type SpanData = {
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
}