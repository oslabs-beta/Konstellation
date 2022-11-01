import React from 'react';

export const TraceLog = (data : {timestamp : string, namespace : string, podName : string, traceID : string, deployment : string, operationName : string, duration : string}) => {
  return (
    <div className="trace-log">
        <div className='column'>
          {data.timestamp}
        </div>
        <div className='column' style={{flexGrow : 2}}>
          {data.namespace}
        </div>
        <div className='column' style={{flexGrow : 3}}>
          {data.podName}
        </div>
        <div className='column' style={{flexGrow : 3}}>
          {data.traceID}
        </div>
        <div className='column' style={{flexGrow : 3}}>
          {data.deployment}
        </div>
        <div className='column'>
          {data.operationName}
        </div>
        <div className='column'>
          {data.duration}
        </div>
    </div>
  );
}