import { Request, Response, NextFunction } from 'express';
import express from 'express';

import ClusterController from '../controllers/ClusterController';
const router = express.Router();

router.get(
  '/',
  ClusterController.getCluster,
  (req: Request, res: Response, next: NextFunction) => {
    console.log('Response Sent w/ Cluster Data!');
    res.status(200).json(res.locals.elements);
  }
);

export default router;
