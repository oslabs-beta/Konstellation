import { TraceController } from "../controllers/TraceController";
import { Request, Response, NextFunction } from 'express';
import express from 'express';

const router = express.Router();

router.get('/getAll/:lookback', 
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

//TEST ROUTE please delete later when the actual route is added
router.get('/getSearchbarTraceView/:traceId', (req: Request, res: Response, next: NextFunction) => {
	  console.log("searchbarTrace endpoint hit")
	const fakeData = {data: {
			id: 'searchBarData',
			type: 'searchBarData',
			traceID: req.params.traceId,
			traceStart: 'November 8 2022, 21:19:11.716',
			traceDuration: '164.25ms',
			serviceCount: 10,
			spanCount: 56,
			label: undefined
		}}
    res.status(200).json(fakeData)
  }
);

//TEST ROUTE please delete later when actual route is added
router.get('/getTraceViewServices/', (req: Request, res: Response, next: NextFunction) => {
	console.log("getTraceViewServices endpoint hit")
const mockData = ['frontend', 'checkoutservice', 'currencyservice']
	res.status(200).json(mockData)
}
);

// router.get('/getSpansInProcess',
//   TraceController.getPodDetails,
//   (req: Request, res: Response, next: NextFunction) => {
//     res.status(200).json(res.locals.processSpecificSpans)
//   }
// )
// router.get('/getSpanDetails', 
//   TraceController.getSpanDetails,
//   (req: Request, res: Response, next: NextFunction) => {
//     res.status(200).json(res.locals.spanDetails)
// } 
// )
// router.post('/post', 
//   TraceController.saveData, 
//   (req: Request, res: Response, next: NextFunction) => {res.status(200).json("Trace Data Added")}
// );

export default router;