import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import styleSheet from '../styles/Stylesheet'
import options from '../constants/CytoscapeConfig'
import { useSelector } from 'react-redux';
import { selectTraceView, TraceData } from './traceViewSlice';
import { useAppDispatch } from '../lib/hooks';
import { changeRenderView, RenderType } from './span-table/spanMapSlice';
import { getSpanTableAsync } from './span-table/spanListSlice';
import { node } from 'webpack';

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
  
  const traceViewData = useSelector(selectTraceView); 
  const layout = options();

  const dispatch = useAppDispatch();

  function loadNewSpanTable(type: RenderType, data: string, id: string) {
    dispatch(changeRenderView({type: RenderType.render, data, id}))
    dispatch(getSpanTableAsync(id));
  }


  let myCyRef;

  if (traceViewData.data.length === 0){
    return (
      <div id="loading-screen">Loading...</div>
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
  
          cy.on("dblclick", "node", evt => {
            var node = evt.target;
            console.log("EVT", evt);
            console.log("TARGET", node.data());
            console.log("TARGET TYPE", typeof node[0]);
            cy.fit( cy.$(':selected'), 50 );
            setTimeout( function(){
              cy.panBy({
                x: -300,
                y: 0
              })
            }, 10)
            const nodeData = node.data()
            // setTimeout( function(){
            //   cy.$('').unselect();
            //   cy.fit(cy.$(''),50);
            // }, 5000 );
            loadNewSpanTable(RenderType.render, nodeData.label, nodeData.id)
            
          });
        }}

      ></CytoscapeComponent>
    </div>
    )
  }
}

export default TraceView;
