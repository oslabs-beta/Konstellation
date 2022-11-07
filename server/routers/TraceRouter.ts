import { TraceController } from "../controllers/TraceController";
import { IRequest, IResponse, INextFunction } from "../interfaces/IExpress";

const express = require('express')

const router = express.Router();

<<<<<<< HEAD
router.get('/getAll', 
  TraceController.getAggregateData,
  (req: IRequest, res: IResponse, next: INextFunction) => {res.status(200).json(res.locals.tracesArray)}
=======
router.get('/', (req: IRequest, res: IResponse, next: INextFunction) => {
  res.send('Awaiting Sample Trace Table Data')
})

router.get('/:traceId', 
  TraceController.getData,
  (req: IRequest, res: IResponse, next: INextFunction) => {res.status(200).json(res.traceData)}
>>>>>>> main
);

router.get('/getIndiv', 
  TraceController.getTraceViewData,
  (req: IRequest, res: IResponse, next: INextFunction) => {res.status(200).json(res.locals.traceViewArray)}
);
router.post('/post', 
  TraceController.saveData, 
  (req: IRequest, res: IResponse, next: INextFunction) => {res.status(200).json("Trace Data Added")}
);

export default router;