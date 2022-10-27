import { Request, Response, NextFunction } from 'express';
import ClusterModel from '../models/ClusterModel';

class ClusterController {

    public static getCluster(req: Request, res: Response, next: NextFunction) {
      try {
        ClusterModel.getCluster(req, res, next);
      }
    catch (err) {
      return next({
        log: `Error in ClusterController.getCluster: ${err}`,
        status: 500,
        message: {
          err: 'Error occured while retrieving networked cluster in ClusterController',
        },
      });
    }
  }
}

export default ClusterController;