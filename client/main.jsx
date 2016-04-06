'use strict';

import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

import TwoColumn from 'components/Layouts/TwoColumn';
import Navigation from 'components/Navigation/Navigation';
import Index from 'components/Index/Index';
import About from 'components/About/About';
import NotFound from 'components/NotFound/NotFound';

render((
  <Router history={browserHistory}>
    <Route component={TwoColumn}>
      <Route path="/" components={{ left: Navigation, right: Index }} />
      <Route path="/about" components={{ left: Navigation, right: About }} />
      <Route path="/*" components={{ left: Navigation, right: NotFound }} />
    </Route>
  </Router>
), document.getElementById('js-main'));