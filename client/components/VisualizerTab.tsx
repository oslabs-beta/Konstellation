import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import styleSheet from './Stylesheet'
// const textToImage = require('text-to-image');

cytoscape.use(coseBilkent);

const VisualizerTab = () => {
    const [podData, setPodData] = useState([]);

    useEffect(() => {
      fetch('/api/cluster')
      .then((response) => response.json())
      // .then((data) => console.log('Inside fetch', data))
      .then((data) => setPodData(data));
    }, []);

    //console.log('podData: ', podData)

  function nodeText(text:string) {
    let canvas = document.createElement("canvas");

    let image = new Image();

    canvas.getContext("2d")!.fillStyle = "#000000";
    //note: font must be declared before the text is filled. 
    canvas.getContext("2d")!.font = "bold 24px roboto";
    //note: the fourth parameter number limits the width of the text image
    // canvas.getContext("2d")!.fillText(text, 25, 25, 250);
    canvas.getContext("2d")!.fillText(text, 25, 73, 250);
   
    return canvas.toDataURL();
  }

//elements object will be the format of what is needed to be fetched from api.
// const elements = [
//   { data: { id: "one", label: "Whole Wheat", type: "pod", data: nodeText("Average Latency: 1.0ms") } },
//   { data: { id: "two", label: "Drew", data: nodeText("Average Latency: 33.40ms") }},
//   { data: { id: "three", label: "Kat", data: nodeText("Kat?") }},
//   { data: { id: "four", label: "Jonathan", data: nodeText("Jonathan?") }},
//   { data: { id: "five", label: "Matthew", data: nodeText("Matthew?") }},
//   { data: { id: "six", label: "Richard", data: nodeText("Richard?") }},
//   { data: { source: "one", target: "two", label: "1x2", color: 'red' } },
//   { data: { source: "two", target: "one", label: "1x2" } },
//   { data: { source: "one", target: "three", label: "1x2" } },
//   { data: { source: "one", target: "four", label: "1x2" } },
//   { data: { source: "one", target: "five", label: "1x2" } },
//   { data: { source: "one", target: "six", label: "1x2" } },
//   { data: { source: "five", target: "six", label: "1x2" } },
//   { data: { source: "three", target: "six", label: "1x2" } }
// ];

const options = {
  name: 'cose-bilkent',
  // name: 'breadthfirst',
  ready: function () {
  },
  // Called on `layoutstop`
  stop: function () {
  },
  // 'draft', 'default' or 'proof" 
  // - 'draft' fast cooling rate 
  // - 'default' moderate cooling rate 
  // - "proof" slow cooling rate
  quality: 'default',
  // Whether to include labels in node dimensions. Useful for avoiding label overlap
  nodeDimensionsIncludeLabels: false,
  // number of ticks per frame; higher is faster but more jerky
  refresh: 30,
  // Whether to fit the network view after when done
  fit: true,
  // Padding on fit
  padding: 50,
  // Whether to enable incremental mode
  randomize: true,
  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: 4500,
  // Ideal (intra-graph) edge length
  idealEdgeLength: 50,
  // Divisor to compute edge forces
  edgeElasticity: 0.45,
  // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
  nestingFactor: 0.1,
  // Gravity force (constant)
  gravity: 0.25,
  // Maximum number of iterations to perform
  numIter: 2500,
  // Whether to tile disconnected nodes
  tile: true,
  // Type of layout animation. The option set is {'during', 'end', false}
  animate: 'end',
  // Duration for animate:end
  animationDuration: 500,
  // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
  tilingPaddingVertical: 10,
  // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
  tilingPaddingHorizontal: 10,
  // Gravity range (constant) for compounds
  gravityRangeCompound: 1.5,
  // Gravity force (constant) for compounds
  gravityCompound: 1.0,
  // Gravity range (constant)
  gravityRange: 3.8,
  // Initial cooling factor for incremental layout
  initialEnergyOnIncremental: 0.5

}

  return (
    <div>
      <div id="title">Konstellation</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
        
      >
        <div id="sidebar">
          <div id='traceSearch'>
          <input placeholder='TraceID'></input>
          <button className='searchButton'>Get Trace Logs</button>
          </div>
          <div id='lineBreak'></div>
          <div className='traceData'>
            Trace Data Goes Here?...
          </div>
        </div>
        <CytoscapeComponent
        
          elements={podData}
          stylesheet={styleSheet}
          layout={options}
          style={{
            width: '70%',
            height: '50rem',
            border: 'solid',
            objectFit: 'cover',
          }}
        ></CytoscapeComponent>
      </div>
    </div>
  );
};

export default VisualizerTab;
