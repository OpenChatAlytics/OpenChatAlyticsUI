'use strict';

import EventBus from './events.js';

import fs from 'fs';
import path from 'path';
import express from 'express';
import compress from 'compression';
import layouts from 'express-ejs-layouts';
import morgan from 'morgan';
import log4js from 'log4js';
import YamlLoader from 'yaml-config-loader';
import request from 'request';
import ExpressWs from 'express-ws';
import WebSocket from 'ws';
import NodeCache from 'node-cache';

let app = express();
let expressWs = ExpressWs(app);
let cache = new NodeCache();

process.on('uncaughtException', function (err) {
  console.error('Caught exception: ' + err);
});

let yamlLoader = new YamlLoader();
yamlLoader.add(path.join(__dirname, 'defaults.config.yaml'), { filterKeys: true });

let defaultConfig = {};
let eventBus = null;
yamlLoader.load((error, config) => {
  console.log("Loaded Yaml Configuration");
  console.log(config);
  defaultConfig = config;
  eventBus = new EventBus(config);
});

log4js.configure({
  appenders: [
    { type: 'console' }
  ],
  replaceConsole: true
});
let logger = log4js.getLogger();

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', { layout: 'layout' });
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(morgan('combined'));
app.use(compress());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));

app.disable('x-powered-by');

var env = {
  production: process.env.NODE_ENV === 'production'
};

if (env.production) {
  Object.assign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
  });
}

app.ws("/api/events/", (ws, req) => {
  eventBus.addSubscriber((data) => {
    // todo: this might be leaking subscribers
    if (ws.readyState == 1) {
      ws.send(JSON.stringify(data));
    }

  }).bind(this);
});

app.use("/api/web/", (req, res) => {
  let url = defaultConfig.dependencies.chatalyticswebUrl + req.url;
  if (req.method == "GET") {
    cache.get(req.originalUrl, (err, val) => {
      if (!err && val) {
        res.send(val);
      } else {
        request(url, (err, resp, body) => {
          if (resp.statusCode === 200) {
            cache.set(req.originalUrl, body);
          }
          res.send(body);
        });
      }
    });

    // req.pipe(request(url)).pipe(res);
  } else {
    req.pipe(request[req.method.toLowerCase()]({ url: url, json: req.body })).pipe(res);
  }
});

app.get('/*', (req, res) => {
  res.render('index', {
    env: env
  });
});

let port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log('server running at localhost:3001, go refresh and see magic');
});

if (env.production === false) {
  let webpack = require('webpack');
  let WebpackDevServer = require('webpack-dev-server');

  let webpackDevConfig = require('./webpack.config.development');

  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/client/',
    contentBase: './client/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(3000, 'localhost', (err) => {
    if (err) {
      console.log(err);
    }

    console.log('webpack dev server listening on localhost:3000');
  });
}
