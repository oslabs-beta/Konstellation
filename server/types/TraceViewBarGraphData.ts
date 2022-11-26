export type TraceViewBarGraphData = {
    data: {
      id: string,
      type: string,
      color: string,
      process: string,
      traceStart : number,
      traceDuration : number,
      label: any,
    }
    // Can edit class for bargraph specific value 
    classes: 'label'
}


