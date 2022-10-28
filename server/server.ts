import { ErrObject, express } from '../types';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
const app = express();
import clusterRouter from './routers/ClusterRouter';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let counter = 0;

import traceRouter from './routers/TraceRouter';

  app.use('/api/cluster', clusterRouter);
  app.use('/api/traces', traceRouter);
  app.use('/api/account', authRouter);
  
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

app.listen(3000, () => console.log('listening on port 3000'));

export default app;
