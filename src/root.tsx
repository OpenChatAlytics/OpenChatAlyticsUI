
import { Provider, connect } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import * as React from 'react';
import { BackTop } from 'antd';
import Navbar from './pages/components/navbar';
import Footer from './pages/components/footer';
import Home from './pages/home';
import Rooms from './pages/rooms';
import Users from './pages/users';
import Entities from './pages/entities';
import './index.scss';

// tslint:disable-next-line
const Animate = require('rc-animate');

// these must use require to work properly
// tslint:disable-next-line:no-var-requires
const enUS = require('antd/lib/locale-provider/en_US');
// tslint:disable-next-line:no-var-requires
const LocaleProvider = require('antd').LocaleProvider;

const layout = (component: JSX.Element) => React.createClass({
  render() {
    return (
      <div style={{ minHeight: '100%', position: 'relative', paddingBottom: '6rem' }}>
        <Navbar />
          <Animate transitionName='fade' transitionAppear>
            {component}
          </Animate>
        <Footer />
      </div>
    );
  },
});

const Root = ({store, history}) => (
  <Provider store={store}>
    <LocaleProvider locale={enUS}>
      <div style={{ flex: 1 }}>
        <BackTop />
        <Router history={history}>
          <Route path='/rooms' component={layout(<Rooms />)} />
          <Route path='/users' component={layout(<Users />)} />
          <Route path='/entities' component={layout(<Entities />)} />
          <Route path='*' component={layout(<Home />)} />
        </Router>
      </div>
    </LocaleProvider>
  </Provider>
);

export default Root;