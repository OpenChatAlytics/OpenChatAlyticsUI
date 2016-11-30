import { applyMiddleware, createStore } from 'redux';
import * as promiseMiddleware from 'redux-promise';
import reducers from 'src/flux/reducers';
import { browserHistory } from 'react-router';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';

const routerMiddleware = createRouterMiddleware(browserHistory);
const middleware = [routerMiddleware, promiseMiddleware];

declare const process;
if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line:no-var-requires
  const createReduxLogger = require('redux-logger');
  middleware.push(createReduxLogger());
}

const store = createStore(
  reducers,
  applyMiddleware(...middleware),
);

export default store;