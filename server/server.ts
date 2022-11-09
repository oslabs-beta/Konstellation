import { ErrObject, express } from '../types';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import clusterRouter from './routers/ClusterRouter';
import traceRouter from './routers/TraceRouter';
import authRouter from './routers/AuthRouter';
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.resolve(__dirname, '../.env')})

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cluster', clusterRouter);
app.use('/api/traces', traceRouter);
// Attempt to connect user to K8 control plane
app.use('/authenticate', authRouter);

// 500: Server Error
app.use((err: ErrObject, req: Request, res: Response, next : NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  console.log('res:', res);
  return res.status(errorObj.status).json(errorObj.message);
});

// 404: Not found
app.use((req: Request, res: Response) => {
  console.log("Server issued a 404 response")
  res.status(404).send('404 Page Not Found')
});

app.listen(3001, () => console.log('SERVER is listening on port 3000'));

export default app;