import { express } from '../types';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
import { config } from './constants/config';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Proxy Server Received a Request');

  res.set('Access-Control-Allow-Origin', ['*']);

  fetch(config.serverUrl + req.path)
    .then((response) => response.json())
    .then((data) => res.send(data));
});

app.listen(3010, () => console.log('Proxy Server is listening on port 3010'));
