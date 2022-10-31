import { Request, Response, NextFunction } from "express";
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi.listNamespacedPod('default').then((res: any) => {
    console.log(res.body.items[0].status);
    console.log(res.body.items[0].spec)
    console.log(res.body.items[0].metadata)
});

//run this page to see what is available from the kubernetes api for a single pod with node client/server/models/test.tsx