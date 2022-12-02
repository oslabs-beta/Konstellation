import { TraceController } from '../controllers/TraceController';
import { Request, Response, NextFunction } from 'express';
import express from 'express';

const router = express.Router();

router.get(
  '/getAll/:service/:lookback',
  TraceController.getAggregateData,
  (req: Request, res: Response, next: NextFunction) => {
    console.log('router complete getAll');
    res.status(200).json(res.locals.tracesArray);
  }
);

router.get(
  '/getTraceView/:traceId',
  TraceController.getTraceViewData,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.traceViewArray);
  }
);

router.get(
  '/getSearchBarTraceView/:traceId',
  TraceController.getTraceViewData,
  TraceController.getSearchBarTraceView,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.searchBarTraceView);
  }
);

router.get(
  '/getTraceViewServices',
  TraceController.getTraceViewServices,
  (req: Request, res: Response, next: NextFunction) => {
    console.log('router complete getAll');
    res.status(200).json(res.locals.traceViewServices);
  }
);

router.get(
  '/getSpansInProcess/:traceId/:processTarget',
  TraceController.getPodDetails,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.processSpecificSpans);
  }
);

router.get(
  '/getIndivSpanDetails/:spanId',
  TraceController.getSpanDetails,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.spanDetails);
  }
);

export default router;
