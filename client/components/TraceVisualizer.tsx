import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import styleSheet from './Stylesheet'
import options from './CytoscapeConfig'

cytoscape.use(coseBilkent);
const TraceVisualizer = () => {

  const [podData, setPodData] = useState([]);

  useEffect(() => {
    fetch('/api/cluster')
    .then((response) => response.json())
    // .then((data) => console.log('Inside fetch', data))
    .then((data) => setPodData(data));
  }, []);
  
  return (
    <div>Hola Mundo</div>
  )
}

export default TraceVisualizer;