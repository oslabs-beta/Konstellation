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
    console.log("Proxy Server Received a Request");

    res.set('Access-Control-Allow-Origin', ['*']);
    
    fetch('http://localhost:3000' + req.path)
    .then(response => response.json() )
    .then(data => res.send(data));
});

app.listen(3010, () => console.log('Proxy Server is listening on port 3001'));