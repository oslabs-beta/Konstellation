import { Request, Response, NextFunction } from "express";
const execSync = require('child_process').execSync;
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

console.log('in AuthModel');

export default class AuthModel {
  public static async connect(req: Request, res: Response, next: NextFunction) {
    console.log('trying to connect...');
    try {
      const output = execSync('kubectl get svc', {encoding: 'utf-8'});
      const namespaceData = await k8sApi.listNamespace();
      //const output = execSync('kubectl get node', {encoding: 'utf-8'});

      console.log('Output was:\n', output);
      next();
    }
    catch(err) {
      // If there is an error, then the user doesn't have access to the EKS
      return next(err);
    }
    // return next();
    //const output = execSync('ls', {encoding: 'utf-8'});

    // const output = execSync('kubectl get node', {encoding: 'utf-8'});
    // console.log('Output was:\n', output);
  }
}