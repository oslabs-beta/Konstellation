import { Request, Response, NextFunction } from 'express';
import express from 'express';

import AuthController from "../controllers/AuthController";
const router = express.Router();

router.get('/', AuthController.connect, (req: Request, res : Response, next : NextFunction) => {
  res.sendStatus(200);
});

export default router;