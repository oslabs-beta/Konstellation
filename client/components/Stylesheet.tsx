import colors from '../src/colors';
import { kubesColors } from '../src/colors';

const styleSheet = [
  {
    selector: 'node',
    style: {
      //color is text color of label
      color: 'white',
     
      //label is displayed above node
      label: 'data(label)',
      // "background-image": 'data(data)',
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
      'border-color': 'grey',
      height: 50,
      width: 50,
    },
  },
  {
    selector: "node[type='pod']",
    style: {
      'border-width': '1px',
      'border-color': 'grey',
      
      height: 50,
      width: 50,
      shape: 'star',
      'background-color': 'lightpink',
      // "text-valign": "center",
      // "text-halign": "center",
    },
  },
  {
    selector: "node[type='client']",
    style: {
      'border-width': '1px',
      'border-color': 'grey',
      
      height: 50,
      width: 50,
      shape: 'triangle',
      'background-color': 'green',
    },
  },
  {
    selector: "node[type='namespace']",
    style: {
      'border-width': '1px',
      'border-color': 'grey',
      
      height: 50,
      width: 50,
      shape: 'triangle',
      'background-color': 'lightblue',
    },
  },
  {
    selector: "node[type='root']",
    style: {
      'border-width': '1px',
      'border-color': 'grey',
      
      height: 50,
      width: 50,
      shape: 'rectangle',
      'background-color': 'green',
    },
  },
  {
    selector: 'edge',
    style: {
      width: 1,
      // 'line-color': 'data(color)',
      // 'target-arrow-color': '#ccc',
      // 'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    },
  },
  {
    selector: "edge[type='arrow']",
    style: {
      width: 1,
      // 'line-color': 'data(color)',
      'font-size': '5px',
      // 'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'label': 'data(label)',
      'color': 'black',
      'text-background-color': 'white'
    },
  },
  {
    selector: ".background",
    style: {
        "text-background-opacity": 1,
        "color": "black",
        "text-background-color": "whitesmoke",
    }
  }
];

export default styleSheet