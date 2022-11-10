import React, { useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { getClusterAsync, ClusterData, selectCluster } from './clusterViewSlice';
import styleSheet from '../styles/Stylesheet';
import options2 from '../constants/CytoscapeConfig';
import cluster from 'cluster';
import LoadingScreen, { LoadingScreenType } from './loadingScreen';

export interface Cluster {
  data: ClusterData
  status: 'idle' | 'loading' | 'failed';
	namespace: string;
}

/**
   * A specific "View" of the Source Map used for presenting cluster data
   * @renders A Source Map which displays a view of the relevant Kubernetes Cluster
   */
export default function clusterView(): JSX.Element {
  
  const {data, status} = useAppSelector(selectCluster);
  const dispatch = useAppDispatch();

  const layout = options2();

  let myCyRef;

  useEffect(() => {
    if(data.length === 0) {
      dispatch(getClusterAsync());
    }
  },[])

  if (status === 'failed') {
    <div id="message-screen">Request Failed. Please confirm server is active.</div>
  }
  if (status === 'loading'){
    return (
      <LoadingScreen type={LoadingScreenType.cyclingStops} />
    )
  }
  else {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
  
        <CytoscapeComponent
          elements={data as []}
          stylesheet={styleSheet}
          layout={layout}
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            background: '#161820' 
          }}
          wheelSensitivity={0.08}
          maxZoom={3.0}
          minZoom={0.1}
          cy={cy => {
            myCyRef = cy;
            cy.on("dblclick", "node", evt => {
              var node = evt.target;
              console.log("EVT", evt);
              console.log("TARGET", node.data());
              console.log("TARGET TYPE", typeof node[0]);
              cy.fit( cy.$(':selected'), 50 );
              setTimeout( function(){
                cy.panBy({
                  x: -100,
                  y: 0
                })
              }, 10)
              setTimeout( function(){
                cy.$('').unselect();
                cy.fit(cy.$(''),50);
              }, 5000 );
            
            });
          }}         
        ></CytoscapeComponent>
      </div>
      </div>
      )
  }
}

