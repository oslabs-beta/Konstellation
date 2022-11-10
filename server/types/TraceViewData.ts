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


