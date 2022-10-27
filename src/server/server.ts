import { ErrObject, express } from '../../types';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let counter = 0;

// app.use('*', setCORS, route);
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request received for endpoint '${req.path}' with method '${req.method}'`);
  const traceData = req.body.traceData ? req.body.traceData : {data: "Example Trace Data From Server"};
  res.send({traceData}).json;
})

  // app.use('/api/dashboard', dashboardRouter);
  // app.use('/api/cluster', clusterRouter);
  // app.use('/api/pod', podRouter);
  // app.use('/api/node', nodeRouter);
  // app.use('/api/custom', customRouter);
  // app.use('/Elements', Elements);
  
  app.use((err: ErrObject, req: Request, res: Response) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });
  
  app.use('*', (req: Request, res: Response) =>
  {
    console.log("this 404")
    res.status(404).send('404 Page Not Found')
  });

app.listen(3001, () => console.log('listening on port 3001'));

export default app;
