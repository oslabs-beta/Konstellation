import { Request, Response, NextFunction } from 'express';
import express from 'express';

import clusterController from '../controllers/ClusterController';
const router = express.Router();

router.get('/', clusterController.getCluster, 
(req: Request, res : Response, next : NextFunction) => {
  res.status(200).json(res.locals.elements);
})

export default router;