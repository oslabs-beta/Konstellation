import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import styleSheet from '../styles/Stylesheet';
import options from '../constants/CytoscapeConfig';
import { useSelector } from 'react-redux';
import { selectTraceView, TraceData } from './traceViewSlice';
import { useAppDispatch } from '../lib/hooks';
import { changeRenderView, RenderType } from './span-table/spanMapSlice';
import { getSpanTableAsync } from './span-table/spanListSlice';
import { node } from 'webpack';
import { selectSourceMap } from './sourceMapSlice';
import { useAppSelector } from '../lib/hooks';
import { selectSearchTraceResult } from './searchBarSlice';

export interface Trace {
  data: TraceData;
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

  const traceData = useAppSelector(selectSearchTraceResult);
  const exportedtraceViewData: any = traceData.data;

  function loadNewSpanTable(
    type: RenderType,
    data: string,
    id: string,
    traceData: any
  ) {
    dispatch(changeRenderView({ type: RenderType.render, data, id }));
    dispatch(getSpanTableAsync(traceData));
  }

  const trace = useSelector(selectSourceMap);
  const traceId = trace.data;

  let myCyRef;

  if (traceViewData.data.length === 0) {
    return <div id="loading-screen">Loading...</div>;
  } else {
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
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            backgroundColor: '#161820',
          }}
          wheelSensitivity={0.08}
          maxZoom={3.0}
          minZoom={0.1}
          cy={(cy) => {
            myCyRef = cy;
            const reset = () => {
              cy.elements().remove();
            };

            cy.on('dblclick', 'node', (evt) => {
              const node = evt.target;

              cy.fit(cy.$(':selected'), 50);
              setTimeout(function () {
                cy.panBy({
                  x: -300,
                  y: 0,
                });
              }, 10);
              const nodeData = node.data();

              let currentTraceId = 'placeholder';
              if (exportedtraceViewData) {
                currentTraceId = exportedtraceViewData.traceID;
              }

              const traceData = {
                processTarget: nodeData.id,
                traceId: currentTraceId,
              };

              loadNewSpanTable(
                RenderType.render,
                nodeData.label,
                nodeData.id,
                traceData
              );
            });
          }}
        ></CytoscapeComponent>
      </div>
    );
  }
};

export default TraceView;
