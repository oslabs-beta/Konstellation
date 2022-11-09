import { TraceController } from "../controllers/TraceController";
import { Request, Response, NextFunction } from 'express';
import express from 'express';

const router = express.Router();

router.get('/getAll', 
  TraceController.getAggregateData,
  (req: Request, res: Response, next: NextFunction) => {
    console.log('router complete getAll');
    res.status(200).json(res.locals.tracesArray);
  }
);

router.get('/getTraceView/:traceId', 
  TraceController.getTraceViewData,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.traceViewArray)
  }
);

router.get('/getSearchBarTraceView', 
  TraceController.getTraceViewData, TraceController.getSearchBarTraceView,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.searchBarTraceView)
  }
);

router.get('/getTraceViewServices', 
  TraceController.getTraceViewServices,
  (req: Request, res: Response, next: NextFunction) => {
    console.log('router complete getAll');
    res.status(200).json(res.locals.traceViewServices);
  }
)
// Will need to pass in req.body the specific pod name, req.body.traceID 
router.get('/getSpansInProcess/:traceId/:processTarget',
  TraceController.getPodDetails,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.processSpecificSpans)
  }
)

// router.get('/getSpanDetails', 
//   TraceController.getSpanDetails,
//   (req: Request, res: Response, next: NextFunction) => {
//     res.status(200).json(res.locals.spanDetails)
//   } 
// )

// router.post('/post', 
//   TraceController.saveData, 
//   (req: Request, res: Response, next: NextFunction) => {res.status(200).json("Trace Data Added")}
// );

export default router;