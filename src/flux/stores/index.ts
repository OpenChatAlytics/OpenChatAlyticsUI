import { applyMiddleware, createStore } from 'redux';
import * as promiseMiddleware from 'redux-promise';
import reducers from 'src/flux/reducers';
import { browserHistory } from 'react-router';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';

const routerMiddleware = createRouterMiddleware(browserHistory);
const store = createStore(
  reducers,
  applyMiddleware(routerMiddleware, promiseMiddleware),
);

export default store;