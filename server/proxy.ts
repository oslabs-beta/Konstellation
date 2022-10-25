import { ErrObject, express } from '../types';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { appendFile} from 'fs';
import { IncomingHttpHeaders } from 'http';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("received a request");
    res.set('Access-Control-Allow-Origin', ['*']);
    const headerDetails: IncomingHttpHeaders = req.headers;
    const headers: HeadersInit = new Headers(headerDetails as HeadersInit);

    fetch('http://localhost:3001' + req.path)
    .then(response => response.json())
    .then(data => res.send(data).json());
});



app.listen(3000, () => console.log('Proxy Server is listening on port 3000'));