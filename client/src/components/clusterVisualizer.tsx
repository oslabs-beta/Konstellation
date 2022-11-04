import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { getClusterAsync, selectElements } from './clusterVisualizerSlice';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import styleSheet from '../../components/Stylesheet';
import options2 from '../../components/CytoscapeConfig';

export default function ClusterVisualizer() {
  
  const clusterData = useAppSelector(selectElements);
  const dispatch = useAppDispatch();

  const layout = options2();

  let myCyRef;
  useEffect(() => {
    console.log(clusterData as [])
    if(!clusterData) {
      dispatch(getClusterAsync());
    }
  })

  console.log(clusterData);
  const obj = [{
    data: {
      id: 'jaeger-operator-7c4556c49f-95v8b',
      label: 'jaeger-operator-7c4556c49f-95v8b',
      type: 'pod'
    }
  },
  {
    data: {
      id: 'jaeger-operator-7c4556c49f-95v8b',
      label: 'jaeger-operator-7c4556c49f-95v8b',
      type: 'pod'
    }
  }]

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
        width: '70%',
        height: '50rem',
        border: 'solid',
        objectFit: 'cover',
      }}
      cy={cy => {
        myCyRef = cy;

        console.log("EVT", cy);

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

