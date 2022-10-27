// import { rootCertificates } from "tls";
// import { ElemController, Elements, k8s } from "../../types";
const k8s = require('@kubernetes/client-node');
const fs = require('fs');
const readline = require('readline');
import { homedir } from 'os';
import { Request, Response, NextFunction } from 'express';

async function getClusterName() {
  try {
    const fileStream = fs.createReadStream(homedir() + '/.kube/config');

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
  
    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      console.log(`Line from file: ${line}`);
      if(line.includes('current-context:')) {
        // Split the line such that the 2nd element is the cluster name
        return line.split('@')[1];
      }
    }
  } catch(err) {
    console.log('Error parsing cluster name:', err);
    return 'root';
  }
}


const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const clusterController = {
  getCluster: async (req: Request, res: any, next: any) => {
    try {
      console.log('in the clusterController')
      const elements = []

       // function nodeText(text:string) {
  //   let canvas = document.createElement("canvas");

  //   let image = new Image();

  //   canvas.getContext("2d")!.fillStyle = "#000000";
  //   //note: font must be declared before the text is filled. 
  //   canvas.getContext("2d")!.font = "bold 24px roboto";
  //   //note: the fourth parameter number limits the width of the text image
  //   // canvas.getContext("2d")!.fillText(text, 25, 25, 250);
  //   canvas.getContext("2d")!.fillText(text, 25, 73, 250);
   
  //   return canvas.toDataURL();

      const clusterName = 'Control Plane'; //await getClusterName()

      elements.push({data: {id: clusterName, label: clusterName, type: 'root'}})

      const namespaceData = await k8sApi.listNamespace();
      let namespaces: string[] = [];
      namespaceData.body.items.forEach((space: any) => {
        const name = space.metadata.name;
        if (name !== 'kube-system') namespaces.push(name);
        elements.push({
          data: {
            id: name,
            label: name,
            type: 'namespace',
          }})
        elements.push({
          data: {
            source: clusterName,
            target: name
          },
        })
      })
         for (const namespace of namespaces) {
        const podData = await k8sApi.listNamespacedPod(namespace);
        podData.body.items.forEach((pod: any) => {
          const name = pod.metadata.name
          elements.push({
            data: {
              id: name,
              label: name,
              type: 'pod',
            }
          })
          elements.push({
            data: {
              source: namespace,
              target: name
            }
          })
        })
      }
      // for (const namespace of namespaces) {
      //   const nodeData = await k8sApi.listNode(namespace);
      //   nodeData.body.items.forEach((node: any) => {
      //     const name = node.metadata.name
      //     elements.push({
      //       data: {
      //         id: name,
      //         label: name,
      //         type: 'node',
      //       }
      //     })
      //     elements.push({
      //       data: {
      //         source: namespace,
      //         target: name
      //       }
      //     })
      //   })
      // }
     

      console.log('In the clusterController: ', elements)
      res.locals.elements = elements
      return next();
    
    }
    catch (err) {
      return next({
        log: `Error in ElemController.getElements: ${err}`,
        status: 500,
        message: {
          err: 'Error occured while retrieving network elements in ElemController',
        },
      });
    }
  }
}

// clusterController.getCluster()

module.exports = clusterController;

// const nodeData = k8sApi.listNode('default').then((res) => {
//     // console.log(res.body);
//     // console.log(res.body.items[0].metadata)
// });

// const podData = k8sApi.listNamespacedPod('default').then((res) => {
//   // console.log(res.body);
//   //metadata contains name and namespace with which it's in
//   // console.log(res.body.items[0].metadata)
//   //spec contains which node it is in: nodeName
//   // console.log(res.body.items[0].spec)
//   // console.log(res.body.items[0].status)
// });

// const namespaceData = k8sApi.listNamespace().then((res) => {
//   // console.log(res.body);
//   console.log(res.body.items[3])
// });
