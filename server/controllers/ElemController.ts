// // import { rootCertificates } from "tls";
// // import { ElemController, Elements, k8s } from "../../types";
// const k8s = require('@kubernetes/client-node');
// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();
// const k8sApi = kc.makeApiClient(k8s.CoreV1Api);



// const elemController = {
//   getElements: async (req, res, next) => {
//     try {
//       const elements = []

//       elements.push({data: {id:'root', label: 'root', type: 'root'}})

//       const namespaceData = await k8sApi.listNamespace();
//       let namespaces = [];
//       namespaceData.body.items.forEach((space) => {
//         const name = space.metadata.name;
//         if (name !== 'kube-system') namespaces.push(name);
//         elements.push({
//           data: {
//             id: name,
//             label: name,
//             type: 'namespace',
//           }})
//         elements.push({
//           data: {
//             source: 'root',
//             target: name
//           },
//         })
//       })
//       console.log(elements)
//       res.locals.elements = elements
//       return next();
    
//     }
//     catch (err) {
//       return next({
//         log: `Error in ElemController.getElements: ${err}`,
//         status: 500,
//         message: {
//           err: 'Error occured while retrieving network elements in ElemController',
//         },
//       });
//     }
//   }
// }

// elemController.getElements()


// // const nodeData = k8sApi.listNode('default').then((res) => {
// //     // console.log(res.body);
// //     // console.log(res.body.items[0].metadata)
// // });

// // const podData = k8sApi.listNamespacedPod('default').then((res) => {
// //   // console.log(res.body);
// //   //metadata contains name and namespace with which it's in
// //   // console.log(res.body.items[0].metadata)
// //   //spec contains which node it is in: nodeName
// //   // console.log(res.body.items[0].spec)
// //   // console.log(res.body.items[0].status)
// // });

// // const namespaceData = k8sApi.listNamespace().then((res) => {
// //   // console.log(res.body);
// //   console.log(res.body.items[3])
// // });
