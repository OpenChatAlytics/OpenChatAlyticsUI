import React, { Component } from 'react';
import TwoColumn from 'components/Layouts/TwoColumn';
import ThreeColumn from 'components/Layouts/ThreeColumn';
import LazyLoad from 'react-lazy-load';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import EasyTransition from 'react-easy-transition'

class MessagesComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="chatalytics">
        <TwoColumn left={<h2>Messages</h2>}
          right={<ThreeColumn left={<StatisticComponent />}
            mid={<StatisticComponent />}
            right={<StatisticComponent />}/>} />
      </div>
    );
  }
}

class StatisticComponent extends Component {

  render() {
    return (
      <div>
        <h3>Statistic B</h3><p>Short statistic description here</p>
          <LazyLoad offsetVertical={500}>
            <AsyncComponent loading={<SpinnerComponent />} loaded={<TableComponent />} />
          </LazyLoad>
      </div>
    );
  }
}

class SpinnerComponent extends Component {
  render() {
    return (
      <EasyTransition
        path={location.pathname}
        initialStyle={{ opacity: 0 }}
        transition="opacity 1s ease-in"
        finalStyle={{ opacity: 1 }}>
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      </EasyTransition>
    );
  }
}

class AsyncComponent extends Component {

  constructor(props) {
    super(props);

    this.state = MainStore.getState();
  }

  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <EasyTransition
        path={location.pathname}
        initialStyle={{ opacity: 0 }}
        transition="opacity 1s ease-in"
        finalStyle={{ opacity: 1 }}>
        {this.state.locations.length ? this.props.loaded : this.props.loading}
      </EasyTransition>);
  }
}

class TableComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <EasyTransition
        path={location.pathname}
        initialStyle={{ opacity: 0 }}
        transition="opacity 1s ease-in"
        finalStyle={{ opacity: 1 }}>
        <table><tbody><tr><td>35237</td><td>Messages Processed</td></tr><tr><td>2315</td><td>Words Analyzed</td></tr><tr><td>53</td><td>Unique Users</td></tr></tbody></table>
      </EasyTransition>
    );
  }
}

export default MessagesComponent;
