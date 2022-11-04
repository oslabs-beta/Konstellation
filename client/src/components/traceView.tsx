import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import styleSheet from '../styles/Stylesheet'
import options from '../constants/CytoscapeConfig'

export interface Trace {
  data: TraceData | undefined
  status: 'idle' | 'loading' | 'failed';

  // const [traceData, setTraceData] = useState([]);

}

// async function handleGetTraceData() {

//   fetch('http://localhost:3000/api/traces/1', {
//     method: 'GET'
//   })
//   .then(response => {
//     if (response.status === 200) {
//       return response.json();
//     }
//   })
//   .then(data => {
//     setType(sourceMapType.trace)
//     setTraceData(data);
//   })
// }


cytoscape.use(coseBilkent);
const TraceVisualizer = (data:any) => {
  const layout = options()

  let myCyRef;
  
  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'space-around',
    }}
  >
    <CytoscapeComponent
      elements={data.data}
      stylesheet={styleSheet}
      layout={layout}
      style={{
        width: '100%',
        height: '50rem',
        objectFit: 'cover',
        backgroundColor: '#161820'
      }}
      maxZoom={3}
      minZoom={0.1}
      cy={cy => {
        myCyRef = cy;

        // console.log("EVT", cy);

        cy.on("tap", "node", evt => {
          var node = evt.target;
          console.log("EVT", evt);
          console.log("TARGET", node.data());
          console.log("TARGET TYPE", typeof node[0]);
        });
      }}
    ></CytoscapeComponent>
  </div>
  )
}

export default TraceVisualizer;