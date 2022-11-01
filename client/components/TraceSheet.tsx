import React from 'react';
import { TraceLog } from './TraceLog';

export const TraceSheet = () => {

  const traces : React.ReactNode [] = [];

  traces.push(TraceLog({
    timestamp: new Date().toString(),
    namespace: 'aiait',
    podName: 'recipes-89bcf6766-qg4mb',
    traceID: '82dd04070eb59e3fe87458c86df5df16',
    deployment: 'recipes',
    operationName: 'dns.lookup',
    duration: '34608'
  }));

  return (
    <div id="trace-sheet">
      {TraceLog({
        timestamp : 'Timestamp',
        namespace : 'Namespace',
        podName : 'Pod Name',
        traceID :'Trace ID',
        deployment : 'Deployment',
        operationName : 'Operation Name',
        duration : 'Duration'})}
      <div id='trace-data'>
        {traces}
      </div>
    </div>
  );
}