import { ErrObject, express } from '../types';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
const app = express();
import clusterRouter from './routers/ClusterRouter';
import  * as dotenv from 'dotenv'
import { env } from '../lib/env'

//Initializes Environment Variables stored in .env
dotenv.config()

if (env.isDevelopment) console.log("DEV!")
if (env.isProduction) console.log("PROD!")

console.log(env.url);

console.log("env")


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
