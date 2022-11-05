import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { getClusterAsync, selectElements, ClusterData } from './clusterViewSlice';
import styleSheet from '../styles/Stylesheet';
import options2 from '../constants/CytoscapeConfig';

export interface Cluster {
  data: ClusterData | undefined
  status: 'idle' | 'loading' | 'failed';
}

export default function clusterView(): JSX.Element {
  
  const clusterData = useAppSelector(selectElements);
  const dispatch = useAppDispatch();

  const layout = options2();

  let myCyRef;

  useEffect(() => {
    if(!clusterData) {
      dispatch(getClusterAsync());
    }
  })

  return (
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >

    <CytoscapeComponent
      elements={clusterData as []}
      stylesheet={styleSheet}
      layout={layout}
      style={{
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        background: '#161820' 
      }}
      maxZoom={3.0}
      minZoom={0.1}
      cy={cy => {
        myCyRef = cy;
        cy.on("tap", "node", evt => {
          var node = evt.target;
          console.log("EVT", evt);
          console.log("TARGET", node.data());
          console.log("TARGET TYPE", typeof node[0]);
        });
      }}
    ></CytoscapeComponent>
  </div>
  </div>
  )
}

