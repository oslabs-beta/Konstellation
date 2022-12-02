/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response, NextFunction } from 'express';

const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

console.log('in AuthModel');

export default class AuthModel {
  public static async connect(req: Request, res: Response, next: NextFunction) {
    console.log('trying to connect...');
    try {

      next();
    } catch (err) {
      console.log('Error in Auth model!');
      return next(err);
    }
  }
}
