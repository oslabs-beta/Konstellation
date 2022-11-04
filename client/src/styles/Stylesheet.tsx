import colors from '../colors';
import { kubesColors } from '../colors';

const uri = 'https://www.kindpng.com/picc/m/74-746008_icon-for-user-user-icon-png-white-transparent.png';
const encoded = encodeURIComponent(uri)

const styleSheet = [
  {
    selector: "node[type='root']",
    style: {
      //color is text color of label
      color: 'white',
     
      //label is displayed above node
      label: 'data(label)',
      //"background-image": 'data(data)',
      //width and height can also be assigned as percentage values.
      "background-width": ["100px", "100px", "100px"],
      "background-height": ["100px", "100px", "100px"],
      "background-position-x": ["0px", "0px"],
      "background-position-y": ["0px", "0px"],
      "background-image-smoothing": 'yes',
      "background-fit": "contain",
      shape: 'rectangle',
      'background-color': 'whitesmoke',
      'border-width': '1px',
      'text-outline-color': 'black',
      'text-outline-width': 1,
      height: 50,
      width: 50,
    },
  },
  {
    selector: "node[type='pod']",
    style: {
      label: 'data(label)',
      color: 'white',
      'border-width': '1px',
      'border-style': 'solid',
      'border-color': '#EFEFEF',
      'border-opacity': '1',
      // 'text-wrap': 'ellipsis',
      // 'text-max-width': '10px',
      height: 50,
      width: 50,
      'font-family': 'SF Pro',
      'background-color': '#EFEFEF',
      'underlay-color': '#ffffff',
      'underlay-opacity': 0.3,
      'underlay-padding': 3,
      'underlay-shape': 'ellipse',
      'text-outline-color': 'black',
      'text-outline-width': 1
    },
    css: {
      'text-wrap': 'ellipsis',
      'text-max-width': '10px',
      'text-outline-color': 'black',
    }
  },
  {
    selector: "node[type='trace']",
    style: {
      label: 'data(label)',
      color: 'white',
      'border-width': '1px',
      'border-style': 'solid',
      'border-color': '#A4C3D2',
      'border-opacity': '1',
      'font-family': 'SF Pro',
      height: 50,
      width: 50,
      'background-color': '#A4C3D2',
      'text-outline-color': 'black',
      'text-outline-width': 1
    }
  },
  {
    selector: "node[type='client']",
    style: {
      label: 'data(label)',
      color: 'white',
      'border-width': '1px',
      'font-family': 'SF Pro',
      'background-image': 'data:text/html;charset=utf-8' + encoded,
      "background-width": ["100px", "100px", "100px"],
      "background-height": ["100px", "100px", "100px"],
      "background-image-smoothing": 'yes',
      "background-fit": "contain",
      height: 50,
      width: 50,
      'text-outline-color': 'black',
      'text-outline-width': 1
    }
  },
  {
    selector: "node[type='namespace']",
    style: {
      label: 'data(label)',
      color: 'white',
      'border-width': '1px',
      'border-color': 'grey',
      height: 50,
      width: 50,
      shape: 'triangle',
      'background-color': '#FFFAA0',
      'font-family': 'SF Pro',
      'text-outline-color': 'black',
      'text-outline-width': 1
    },
  },
  {
    selector: "node[type='root']",
    style: {
      'border-width': '1px',
      'border-color': 'grey',
      'font-family': 'SF Pro',
      'text-outline-color': 'black',
      'text-outline-width': 1,
      height: 50,
      width: 50,
      shape: 'rectangle',
      'background-color': '#006994',
    },
  },
  {
    selector: 'edge',
    style: {
      width: 1,
      'curve-style': 'bezier'
    },
  },
  {
    selector: "edge[type='arrow']",
    style: {
      width: 1,
      'line-color': 'white',
      'font-size': '13px',
      // 'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': 'white',
      'curve-style': 'bezier',
      'label': 'data(label)',
      'color': 'black',
      'text-background-color': 'white',
      'font-family': 'SF Pro',
    },
  },
  {
    selector: ".background",
    style: {
        "text-background-opacity": 1,
        "color": "white",
        "text-background-color": "#161820",
        'font-family': 'SF Pro',
    }
  },
  // {
  //   selector: ".wrapping",
  //   css: {
  //     // 'text-wrap': 'ellipsis',
  //     // 'text-max-width': 80
  //     // "text-background-opacity": 1,
  //     // "text-valign": "center",
  //   }
  // }
];

export default styleSheet