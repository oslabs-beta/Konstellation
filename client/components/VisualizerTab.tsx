import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import colors from '../colors';
import { kubesColors } from '../colors';
// const textToImage = require('text-to-image');

cytoscape.use(coseBilkent);
cytoscape.use(require('cytoscape-dom-node'))
// cytoscape.use(cytoscapeDomNode);

const VisualizerTab = () => {
    const [podData, setPodData] = useState([]);

    useEffect(() => {
    
    }, []);

  // const dataUri = textToImage.generateSync('Lorem ipsum dolor sit amet');

  function getPods() {
    fetch('/api/getPods')
      .then((response) => response.json())
      .then((data) => setPodData(data));
  }


  const div = document.createElement("div");
  div.innerHTML = 'Hello World';
  div.style.width = '100px';
  div.style.height = '50px';

//Turns nodes into svg images.


let svg_string =
'<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg width="96" height="46" viewBox="0 0 96 46" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="95" height="45" rx="9.5" fill="#FAFAFA" stroke="black"/><path d="M34.1035 28H32.9727V24.0566H28.6719V28H27.5469V19.4688H28.6719V23.1367H32.9727V19.4688H34.1035V28ZM35.6445 24.7715C35.6445 24.1504 35.7656 23.5918 36.0078 23.0957C36.2539 22.5996 36.5938 22.2168 37.0273 21.9473C37.4648 21.6777 37.9629 21.543 38.5215 21.543C39.3848 21.543 40.082 21.8418 40.6133 22.4395C41.1484 23.0371 41.416 23.832 41.416 24.8242V24.9004C41.416 25.5176 41.2969 26.0723 41.0586 26.5645C40.8242 27.0527 40.4863 27.4336 40.0449 27.707C39.6074 27.9805 39.1035 28.1172 38.5332 28.1172C37.6738 28.1172 36.9766 27.8184 36.4414 27.2207C35.9102 26.623 35.6445 25.832 35.6445 24.8477V24.7715ZM36.7344 24.9004C36.7344 25.6035 36.8965 26.168 37.2207 26.5938C37.5488 27.0195 37.9863 27.2324 38.5332 27.2324C39.084 27.2324 39.5215 27.0176 39.8457 26.5879C40.1699 26.1543 40.332 25.5488 40.332 24.7715C40.332 24.0762 40.166 23.5137 39.834 23.084C39.5059 22.6504 39.0684 22.4336 38.5215 22.4336C37.9863 22.4336 37.5547 22.6465 37.2266 23.0723C36.8984 23.498 36.7344 24.1074 36.7344 24.9004ZM46.4668 26.3184C46.4668 26.0254 46.3555 25.7988 46.1328 25.6387C45.9141 25.4746 45.5293 25.334 44.9785 25.2168C44.4316 25.0996 43.9961 24.959 43.6719 24.7949C43.3516 24.6309 43.1133 24.4355 42.957 24.209C42.8047 23.9824 42.7285 23.7129 42.7285 23.4004C42.7285 22.8809 42.9473 22.4414 43.3848 22.082C43.8262 21.7227 44.3887 21.543 45.0723 21.543C45.791 21.543 46.373 21.7285 46.8184 22.0996C47.2676 22.4707 47.4922 22.9453 47.4922 23.5234H46.4023C46.4023 23.2266 46.2754 22.9707 46.0215 22.7559C45.7715 22.541 45.4551 22.4336 45.0723 22.4336C44.6777 22.4336 44.3691 22.5195 44.1465 22.6914C43.9238 22.8633 43.8125 23.0879 43.8125 23.3652C43.8125 23.627 43.916 23.8242 44.123 23.957C44.3301 24.0898 44.7031 24.2168 45.2422 24.3379C45.7852 24.459 46.2246 24.6035 46.5605 24.7715C46.8965 24.9395 47.1445 25.1426 47.3047 25.3809C47.4688 25.6152 47.5508 25.9023 47.5508 26.2422C47.5508 26.8086 47.3242 27.2637 46.8711 27.6074C46.418 27.9473 45.8301 28.1172 45.1074 28.1172C44.5996 28.1172 44.1504 28.0273 43.7598 27.8477C43.3691 27.668 43.0625 27.418 42.8398 27.0977C42.6211 26.7734 42.5117 26.4238 42.5117 26.0488H43.5957C43.6152 26.4121 43.7598 26.7012 44.0293 26.916C44.3027 27.127 44.6621 27.2324 45.1074 27.2324C45.5176 27.2324 45.8457 27.1504 46.0918 26.9863C46.3418 26.8184 46.4668 26.5957 46.4668 26.3184ZM50.4336 20.125V21.6602H51.6172V22.498H50.4336V26.4297C50.4336 26.6836 50.4863 26.875 50.5918 27.0039C50.6973 27.1289 50.877 27.1914 51.1309 27.1914C51.2559 27.1914 51.4277 27.168 51.6465 27.1211V28C51.3613 28.0781 51.084 28.1172 50.8145 28.1172C50.3301 28.1172 49.9648 27.9707 49.7188 27.6777C49.4727 27.3848 49.3496 26.9688 49.3496 26.4297V22.498H48.1953V21.6602H49.3496V20.125H50.4336ZM59.6211 24.0098C59.6211 24.8457 59.4805 25.5762 59.1992 26.2012C58.918 26.8223 58.5195 27.2969 58.0039 27.625C57.4883 27.9531 56.8867 28.1172 56.1992 28.1172C55.5273 28.1172 54.9316 27.9531 54.4121 27.625C53.8926 27.293 53.4883 26.8223 53.1992 26.2129C52.9141 25.5996 52.7676 24.8906 52.7598 24.0859V23.4707C52.7598 22.6504 52.9023 21.9258 53.1875 21.2969C53.4727 20.668 53.875 20.1875 54.3945 19.8555C54.918 19.5195 55.5156 19.3516 56.1875 19.3516C56.8711 19.3516 57.4727 19.5176 57.9922 19.8496C58.5156 20.1777 58.918 20.6562 59.1992 21.2852C59.4805 21.9102 59.6211 22.6387 59.6211 23.4707V24.0098ZM58.502 23.459C58.502 22.4473 58.2988 21.6719 57.8926 21.1328C57.4863 20.5898 56.918 20.3184 56.1875 20.3184C55.4766 20.3184 54.916 20.5898 54.5059 21.1328C54.0996 21.6719 53.8906 22.4219 53.8789 23.3828V24.0098C53.8789 24.9902 54.084 25.7617 54.4941 26.3242C54.9082 26.8828 55.4766 27.1621 56.1992 27.1621C56.9258 27.1621 57.4883 26.8984 57.8867 26.3711C58.2852 25.8398 58.4902 25.0801 58.502 24.0918V23.459ZM63.8223 24.1973C62.8574 23.9199 62.1543 23.5801 61.7129 23.1777C61.2754 22.7715 61.0566 22.2715 61.0566 21.6777C61.0566 21.0059 61.3242 20.4512 61.8594 20.0137C62.3984 19.5723 63.0977 19.3516 63.957 19.3516C64.543 19.3516 65.0645 19.4648 65.5215 19.6914C65.9824 19.918 66.3379 20.2305 66.5879 20.6289C66.8418 21.0273 66.9688 21.4629 66.9688 21.9355H65.8379C65.8379 21.4199 65.6738 21.0156 65.3457 20.7227C65.0176 20.4258 64.5547 20.2773 63.957 20.2773C63.4023 20.2773 62.9688 20.4004 62.6562 20.6465C62.3477 20.8887 62.1934 21.2266 62.1934 21.6602C62.1934 22.0078 62.3398 22.3027 62.6328 22.5449C62.9297 22.7832 63.4316 23.002 64.1387 23.2012C64.8496 23.4004 65.4043 23.6211 65.8027 23.8633C66.2051 24.1016 66.502 24.3809 66.6934 24.7012C66.8887 25.0215 66.9863 25.3984 66.9863 25.832C66.9863 26.5234 66.7168 27.0781 66.1777 27.4961C65.6387 27.9102 64.918 28.1172 64.0156 28.1172C63.4297 28.1172 62.8828 28.0059 62.375 27.7832C61.8672 27.5566 61.4746 27.248 61.1973 26.8574C60.9238 26.4668 60.7871 26.0234 60.7871 25.5273H61.918C61.918 26.043 62.1074 26.4512 62.4863 26.752C62.8691 27.0488 63.3789 27.1973 64.0156 27.1973C64.6094 27.1973 65.0645 27.0762 65.3809 26.834C65.6973 26.5918 65.8555 26.2617 65.8555 25.8438C65.8555 25.4258 65.709 25.1035 65.416 24.877C65.123 24.6465 64.5918 24.4199 63.8223 24.1973Z" fill="black"/></svg>';

function createSVG(text: string) {
    var canvas = document.createElement("canvas");
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('style', 'background-color: black');
    svg.setAttribute('width', '600');
    svg.setAttribute('height', '250');
    svg.setAttribute('innerHTML', 'Hello World')
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    
    var textNode = document.createTextNode(text);
    svg.appendChild(textNode);
    return canvas.toDataURL();
  }
  
    let canvas = document.createElement("canvas");

    let image = new Image();
    image.src = createSVG("Hi Richard!");

    canvas.getContext("2d")!.fillStyle = "#CC00FF";
    canvas.getContext("2d")!.fillText("Hi Richard!", 50, 50);

    var url = canvas.toDataURL();
    console.log(url);

  //   function addTextToImage(url: string, text: string) {
  //     var circle_canvas = document.createElement("canvas");
  //     var context = circle_canvas.getContext("2d");
  
  //     // Draw Image function
  //     var img = new Image();
  //     img.src = url;
  //     img.onload = function () {
  //         context.drawImage(img, 0, 0);
  //         context.lineWidth = 1;
  //         context.fillStyle = "#CC00FF";
  //         context.lineStyle = "#ffff00";
  //         context.font = "18px sans-serif";
  //         context.fillText(text, 50, 50);
  //     };
  // }

  // addTextToImage

    //TODO: Text Node Approach

const elements = [
  { data: { id: "one", label: "Whole Wheat", type: "pod", data: url } },
  { data: { id: "two", label: "Drew", dom: div, descr: 'Hello' }},
  { data: { id: "three", label: "Kat" }},
  { data: { id: "four", label: "Jonathan" }},
  { data: { id: "five", label: "Mathew" }},
  { data: { id: "six", label: "Richard" }},
  { data: { source: "one", target: "two", label: "1x2" } },
  { data: { source: "one", target: "three", label: "1x2" } },
  { data: { source: "one", target: "four", label: "1x2" } },
  { data: { source: "one", target: "five", label: "1x2" } },
  { data: { source: "one", target: "six", label: "1x2" } },
  { data: { source: "five", target: "six", label: "1x2" } },
  { data: { source: "three", target: "six", label: "1x2" } }
];

//TODO: Add options to Notion Cytoscape
const options = {
  
  name: 'cose-bilkent',
  
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
  padding: 100,
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

//TODO: Export this
  const styleSheet = [
    {
      selector: 'node',
      style: {
        //color is text color
        color: 'white',
        text: 'hello',
        // data: 'data(label)',
        data: 'data(descr)',
        // content: 'data(label)',
        //label is displayed above node
        label: 'data(label)',
        "background-image": 'data(data)',
        "background-width": ["24px", "20px", "20px"],
        "background-height": ["24px", "20px", "20px"],
        "background-opacity": 10,
        // "dom": div,
        dom: div,
        // 'background-color': colors.pastel.solid.geyser,
        // 'background-text': 'Hello'
      },
    },
    {
      selector: "node[type='namespace']",
      style: {
        'border-width': '3px',
        'border-color': 'black',
        shape: 'rectangle',
        'background-color': colors.pastel.solid.envy,
      },
    },
    {
      selector: "node[type='pod']",
      style: {
        'border-width': '3px',
        'border-color': 'black',
        'text-vertical-align': 'bottom',
        height: 100,
        width: 100,
        shape: 'rectangle',
        'background-color': colors.pastel.solid.polo,
      },
    },
    {
      selector: "node[type='node']",
      style: {
        'border-width': '3px',
        'border-color': 'black',
        shape: 'triangle',
        'background-color': kubesColors.purple,
      },
    },
    {
      selector: "node[type='service']",
      style: {
        'border-width': '3px',
        'border-color': 'black',
        shape: 'hexagon',
        'background-color': colors.pastel.solid.martini,
      },
    },
    {
      selector: "node[type='deployment']",
      style: {
        'border-width': '3px',
        'border-color': 'black',
        shape: 'diamond',
        'background-color': colors.pastel.solid.glacier,
      },
    },
    {
      selector: 'edge',
      style: {
        width: 3,
        'line-color': colors.translucent.currentLine,
      },
    },
  ];

  //TODO: Add example buttons forom Kubernocular github links to cytoscope documentation
  return (
    <div id="title">
      Konstellation
      {/* <div>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Chip
            avatar={<Avatar src="https://hmp.me/dyjo" />}
            label="Nodes"
            variant="outlined"
            style={{
              color: kubesColors.purple,
              borderColor: kubesColors.purple,
            }}
          />
          <Chip
            avatar={<Avatar src="https://hmp.me/dyka" />}
            label="Namespaces"
            variant="outlined"
            style={{
              color: colors.pastel.solid.envy,
              borderColor: colors.pastel.solid.envy,
            }}
          />
          <Chip
            avatar={<Avatar src="https://hmp.me/dyjh" />}
            label="Pods"
            variant="outlined"
            style={{
              color: colors.pastel.solid.polo,
              borderColor: colors.pastel.solid.polo,
            }}
          />
          <Chip
            avatar={<Avatar src="https://hmp.me/dyjg" />}
            label="Services"
            variant="outlined"
            style={{
              color: colors.pastel.solid.martini,
              borderColor: colors.pastel.solid.martini,
            }}
          />
          <Chip
            avatar={<Avatar src="https://hmp.me/dyj6" />}
            label="Deployments"
            variant="outlined"
            style={{
              color: colors.pastel.solid.glacier,
              borderColor: colors.pastel.solid.glacier,
            }}
          />
        </Stack>
      </div> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CytoscapeComponent
        
          elements={elements}
          stylesheet={styleSheet}
          layout={options}
          style={{
            width: '90%',
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
