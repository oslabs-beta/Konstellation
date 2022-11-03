import { TraceController } from "../controllers/TraceController";
import { IRequest, IResponse, INextFunction } from "../interfaces/IExpress";

const express = require('express')

const router = express.Router();

router.get('/:traceId', 
  TraceController.getData,
  (req: IRequest, res: IResponse, next: INextFunction) => {res.status(200).json(res.traceData)}
);

//route under construction
//route that querires for all traces under a specific pod name
//this may have to change to service later on depending on what it looks like for multi-pod interaction traces
router.get('/podName', 
  TraceController.getData,
  (req: IRequest, res: IResponse, next: INextFunction) => {res.status(200).json(res.traceData)}
);

router.post('*', 
  TraceController.saveData, 
  (req: IRequest, res: IResponse, next: INextFunction) => {res.status(200).json("Trace Data Added")}
);

export default router;