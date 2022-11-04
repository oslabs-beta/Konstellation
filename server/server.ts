import { ErrObject, express } from '../types';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
const app = express();
import clusterRouter from './routers/ClusterRouter';
import { config } from './config'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.resolve(__dirname, '../.env')})

console.log(process.env.BASE_URL_PROD)


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let counter = 0;

import traceRouter from './routers/TraceRouter';

  app.use('/api/cluster', clusterRouter);
  app.use('/api/traces', traceRouter);
  
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
    console.log("Server issued a 404 response")
    res.status(404).json('404 Page Not Found')
  });

app.listen(3000, () => console.log('listening on port 3000'));

export default app;
