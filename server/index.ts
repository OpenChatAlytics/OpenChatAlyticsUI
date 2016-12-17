import * as express from 'express';
import * as process from 'process';
import * as request from 'request';
import * as program from 'commander';
import * as path from 'path';

program
  .version('1.0.0')
  .option('-p, --port <port>', 'Port number (navigate to localhost:port to view the web page)')
  .option('-h, --host <host>', 'Chatalytics web host (default is http://localhost:8080)')
  .parse(process.argv);


const chatalyticsHost = (program as any).host || 'http://localhost:8080';
const serverPort = (program as any).port || 8080;

process.on('uncaughtException', (err) => {
  console.log('Caught exception: ' + err);
});

const app = express();

// proxies api requests to chatalytics
app.use('/api/', (req, res) => {
  const url = `${chatalyticsHost}/api${req.url}`;
  req.pipe(request[req.method.toLowerCase()]({ url, json: req.body })).pipe(res);
});

app.use(express.static(path.resolve('./dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}`);
});