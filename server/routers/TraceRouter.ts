import { TraceController } from "../controllers/TraceController";
import { IRequest, IResponse, INextFunction } from "../interfaces/IExpress";

const express = require('express')

const router = express.Router();

router.get('/:traceId', 
  TraceController.getData,
  (req: IRequest, res: IResponse, next: INextFunction) => {res.status(200).json(res.traceData)}
);

router.post('*', 
  TraceController.saveData, 
  (req: IRequest, res: IResponse, next: INextFunction) => {res.status(200).json("Trace Data Added")}
);

export default router;