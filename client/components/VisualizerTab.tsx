import React, { useState, useEffect } from 'react';

import ClusterVisualizer from '../src/components/clusterVisualizer'
import TraceVisualizer from './TraceVisualizer'

enum VisualizerType{cluster, trace}

const VisualizerTab = () => {
 
  const [type, setType] = useState<VisualizerType>(VisualizerType.cluster)
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
    console.log(data);
    setType(VisualizerType.trace)
    setTraceData(data);
  })
}

// ClusterVisualizer
// TraceVisualizer

  if (type === VisualizerType.cluster) {
    return (
      <div>
        <div id = 'title'>Konstellation</div>
        <div id="sidebar">
          <div id='traceSearch'>
          <input placeholder='TraceID'></input>
          <button className='searchButton' onClick={handleGetTraceData}>Get Trace Logs</button>
        </div>
        <div id='lineBreak'></div>
        <div className='traceData'>
           
        </div>
      <ClusterVisualizer />
        </div>
      </div>
    );
  }
  else if (type === VisualizerType.trace) {
    return (
      <div>
        <div id = 'title'>Konstellation</div>
        <div id="sidebar">
          <div id='traceSearch'>
          <input placeholder='TraceID'></input>
          <button className='searchButton'>Get Trace Logs</button>
        </div>
        <div id='lineBreak'></div>
        <div className='traceData'>
         
        </div>
          <TraceVisualizer data={traceData}/>
        </div>
    </div>
    );
  }
  return null
};

export default VisualizerTab;
