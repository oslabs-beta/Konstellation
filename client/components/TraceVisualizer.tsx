import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import styleSheet from './Stylesheet'
import options2 from './CytoscapeConfig'

cytoscape.use(coseBilkent);
const TraceVisualizer = (data:any) => {
  const layout = options2()

  console.log(data.data);

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
  )
}

export default TraceVisualizer;