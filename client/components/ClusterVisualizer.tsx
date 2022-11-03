import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import styleSheet from './Stylesheet'
import options2 from './CytoscapeConfig'


cytoscape.use(coseBilkent);
const ClusterVisualizer = () => {
  console.log('imported options: ', options2)
  const [podData, setPodData] = useState([]);

  useEffect(() => {
    fetch('/api/cluster')
    .then((response) => response.json())
    // .then((data) => console.log('Inside fetch', data))
    .then((data) => {setPodData(data)});
  }, []);

  const layout = options2()
  // console.log("Cluster Data Format:")
  // console.log(podData);
  
  let myCyRef;

  return (
  <div>
  {/* <div id="title">Konstellation</div> */}
  <div 
    style={{
      display: 'flex',
    }}
    
  >
    
   
    <CytoscapeComponent
     
      elements={podData}
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
  </div>
  )
}

export default ClusterVisualizer