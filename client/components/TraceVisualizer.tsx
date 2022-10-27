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
    ></CytoscapeComponent>
  </div>
  )
}

export default TraceVisualizer;