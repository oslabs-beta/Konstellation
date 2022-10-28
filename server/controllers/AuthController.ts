import {Request, Response, NextFunction} from 'express';

class AuthController {
  public static create(req: Request, res: Response, next: NextFunction) {
    req.assert('email', 'E-mail cannot be blank').notEmpty();
  }
}

export default AuthController;