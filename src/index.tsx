// tslint:disable-next-line:no-reference
/// <reference path="../typings/index.d.ts"/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory  } from 'react-router';
import Home from './pages/home';
import store from './flux';
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Home} />
    </Router>
  </Provider>,
  document.getElementById('container'),
);