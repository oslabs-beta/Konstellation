import React, { useState} from 'react';
import ClusterView from './clusterView'
import TraceView from './traceView'

enum sourceMapType{cluster, trace}

const VisualizerTab = () => {
 
  const [type, setType] = useState<sourceMapType>(sourceMapType.cluster)
  const [traceData, setTraceData] = useState([]);

async function handleGetTraceData() {

  fetch('http://localhost:3000/api/traces/1', {
    method: 'GET'
  })
  .then(response => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .then(data => {
    setType(sourceMapType.trace)
    setTraceData(data);
  })
}

  if (type === sourceMapType.cluster) {
    return (
      <div>
          <ClusterView />
      </div>
    );
  }
  else if (type === sourceMapType.trace) {
    return (
    <div>
      <TraceView data={traceData}/>
    </div>
    );
  }
  return null
};

export default VisualizerTab;
