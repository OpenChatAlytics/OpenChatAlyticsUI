// tslint:disable-next-line:no-reference
/// <reference path="../typings/index.d.ts"/>

import * as ReactNotificationSystem from 'react-notification-system';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import Navbar from './pages/components/navbar';
import Home from './pages/home';
import Rooms from './pages/rooms';
import Users from './pages/users';
import * as Actions from 'src/flux/actions';
import store from './flux';
import './index.scss';

const navbar = (component: any) => React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        {component}
      </div>
    );
  },
});

class Index extends React.Component<any, any> {

  public readonly refs: {
    notification_system: Element;
  };

  public componentDidMount() {
    this.props.notifyInit(this.refs.notification_system);
  }

  public render() {
    return (
      <div>
        <ReactNotificationSystem ref='notification_system' />
        <Router history={browserHistory}>
          <Route path='/rooms' component={navbar(<Rooms />)} />
          <Route path='/users' component={navbar(<Users />)} />
          <Route path='*' component={navbar(<Home />)} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = (dispatch) => ({
  notifyInit: (container) => dispatch(Actions.notifyInit(container)),
});

// tslint:disable-next-line:variable-name
const IndexProvider = connect(mapStateToProps, mapDispatchToProps)(Index);

ReactDOM.render(
  <Provider store={store}>
    <IndexProvider />
  </Provider>,
  document.getElementById('container'),
);