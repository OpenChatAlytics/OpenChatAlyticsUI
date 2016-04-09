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
      <Route path="/*" component={Index} />
  </Router>
), document.getElementById('js-main'));