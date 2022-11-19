import { Request, Response, NextFunction } from 'express';
import AuthModel from '../models/AuthModel';

export default class AuthController {
  public static connect(req: Request, res: Response, next: NextFunction) {
    AuthModel.connect(req, res, next);
  }
}
