import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import styleSheet from '../styles/Stylesheet'
import options from '../constants/CytoscapeConfig'
import { useSelector } from 'react-redux';
import { selectTraceViewData } from './traceViewSlice';

export interface Trace {
  data: TraceData
  status: 'idle' | 'loading' | 'failed';
}

cytoscape.use(coseBilkent);

/**
 * Renders trace data by fetching it from the Redux Store
 * @Remarks Trace Data requests should be dispatched by the components handling the event which caused a trace to load.
 */
  const TraceView = () => {
  
  const traceViewData = useSelector(selectTraceViewData); 
  const layout = options();

  let myCyRef;

  if (traceViewData.data.length === 0){
    return (
      <div>Loading</div>
    )
  }
  else {
    return (
      <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <CytoscapeComponent
        elements={traceViewData.data}
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
}

export default TraceView;
