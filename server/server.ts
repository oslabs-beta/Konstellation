import { ErrObject, express } from '../types';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { appendFile} from 'fs';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let counter = 0;

// app.use('*', setCORS, route);
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("hit CORS Use")
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

function route(req: Request, res: Response, next: NextFunction): void {
  console.log("in route");

  app.get('/', logRequest, (req: Request, res: Response, next: NextFunction) => {
    console.log("inside get")
    const traceData = req.body.traceData ? req.body.traceData : {data: "Example Trace Data From Server"};
    res.send(traceData).json;
  })
  
  // app.use('/api/dashboard', dashboardRouter);
  // app.use('/api/cluster', clusterRouter);
  // app.use('/api/pod', podRouter);
  // app.use('/api/node', nodeRouter);
  // app.use('/api/custom', customRouter);
  // app.use('/Elements', Elements);
  
  app.use('/', (req: Request, res: Response) =>
  {
    res.set('Access-Control-Allow-Origin', ['*']);
    console.log("request received");
    res.send(200)
  });
  
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
}

app.listen(3000, () => console.log('listening on port 3000'));


function logRequest(req: Request, res: Response, next: NextFunction) {
  // console.log(req.socket.remoteAddress); // Use this if not using a server proxy (ex: ngrok)
  // console.log(req.headers['x-forwarded-for']); // Use this if using a server proxy (ex: ngrok)
  const logData: any = req.body.traceData ? req.body.traceData : {data: "Example Trace Data From Server"};

  appendFile('data.txt', 
    `Request from ${req.headers['x-forwarded-for']} @ ${getTimestamp()}\n Included Data: ${logData.data} \n \n`,
    function(err) {if (err) return console.log(err)})
  
  console.log(``)
  console.log(`Request from ${req.headers['x-forwarded-for']} at: ${getTimestamp()} \nIncluded Data: ${logData}`,)
  console.log(`${counter++} requests made since last server restart`);

  next();

  function getTimestamp() {
    let ts = Date.now();
  
    let date_ob = new Date(ts);
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
  
  // prints date & time in YYYY-MM-DD format
   return (year + "-" + month + "-" + date + " at " + hours + ":" + minutes + ":" + seconds);
  }
}

export default app;
