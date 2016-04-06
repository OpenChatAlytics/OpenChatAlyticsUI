import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import connectToStores from 'alt-utils/lib/connectToStores';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';

class NavigationComponent extends Component {

  constructor() {
    super();
    this.state = MainStore.getState();
  }

  static getStores(props) {
    return [MainStore]
  }

  static getPropsFromStores(props) {
    return MainStore.getState()
  }

  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    MainStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleResize(e) {
    this.setState({ windowWidth: window.innerWidth });
  }

  render() {
    if (this.state.windowWidth < 600) {
      return <SmallNavigationComponent />;
    } else if (this.state.windowWidth < 980) {
      return <MediumNavigationComponent />;
    } else {
      return <LargeNavigationComponent />;
    }
  }

}

class SmallNavigationComponent extends Component {

  constructor() {
    super();
    this.state = MainStore.getState();
  }

  static getStores(props) {
    return [MainStore]
  }

  static getPropsFromStores(props) {
    return MainStore.getState()
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
      <div className="navigation navigation-small">
        <h2><i className="fa fa-line-chart fa-2x"></i></h2>
        <ul>
          <li><Link to={`/`}><i className="fa fa-home fa-2x"></i></Link></li>
          <li><Link to={`/chatalytics`}><i className="fa fa-bar-chart fa-2x"></i></Link></li>
          <li><Link to={`/about`}><i className="fa fa-info fa-2x"></i></Link></li>
          <li><a href="https://github.com/OpenChatAlytics"><i className="fa fa-github fa-2x"></i></a></li>
        </ul>
      </div>
    );
  }
}


class MediumNavigationComponent extends Component {

  constructor() {
    super();
    this.state = MainStore.getState();
  }

  static getStores(props) {
    return [MainStore]
  }

  static getPropsFromStores(props) {
    return MainStore.getState()
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
      <div className="navigation navigation-medium">
        <h2><i className="fa fa-line-chart fa-2x"></i></h2>
        <ul>
          <li><Link to={`/`}>Home</Link></li>
          <li><Link to={`/chatalytics`}>Chatalytics</Link></li>
          <li><Link to={`/about`}>About</Link></li>
          <li><a href="https://github.com/OpenChatAlytics">GitHub</a></li>
        </ul>
      </div>
    );
  }
}

class LargeNavigationComponent extends Component {

  constructor() {
    super();
    this.state = MainStore.getState();
  }

  static getStores(props) {
    return [MainStore]
  }

  static getPropsFromStores(props) {
    return MainStore.getState()
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
      <div className="navigation navigation-large">
        <h2><i className="fa fa-line-chart fa-2x"></i></h2>
        <ul>
          <li><Link to={`/`}>Home</Link></li>
          <li><Link to={`/chatalytics`}>Chatalytics</Link></li>
          <li><Link to={`/about`}>About</Link></li>
          <li><a href="https://github.com/OpenChatAlytics">GitHub</a></li>
        </ul>
      </div>
    );
  }
}

NavigationComponent = connectToStores(NavigationComponent)
SmallNavigationComponent = connectToStores(SmallNavigationComponent)
LargeNavigationComponent = connectToStores(LargeNavigationComponent)

export default NavigationComponent;
