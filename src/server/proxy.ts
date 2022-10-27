import { ErrObject, express } from '../../types';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { IncomingHttpHeaders } from 'http';
import { TraceController } from './controllers/TraceController';
const app = express();
const protobuf = require('protobufjs');

app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use((req: Request, res: Response, next: NextFunction) => {
//     console.log("New Request @ " + TraceController.getTimestamp());
//     console.log(req.method);
//     console.log(req.body);
//     console.log(req.params);
//     console.log(req.readable);
//     console.log(req.read());
    // if(req.body) console.log(protobuf.decode(Buffer.from(req.body)));

//     res.set('Content-Type', 'application/x-protobuf');
//     res.send("hello from server!");

//     // console.log("received a request");
//     // res.set('Access-Control-Allow-Origin', ['*']);
//     // // const headerDetails: IncomingHttpHeaders = req.headers;
//     // // const headers: HeadersInit = new Headers(headerDetails as HeadersInit);
//     // fetch('http://localhost:3001' + req.path)
//     // .then(response => response.json())
//     // .then(data => res.send(data));
// });

// app.listen(4318, () => console.log('Proxy Server is listening on port 4318'));