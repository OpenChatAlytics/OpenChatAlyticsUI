import React, { Component } from 'react';
import MainStore from '../../stores/MainStore';
import AsyncComponent from '../Chatalytics/Async';

export default class UserComponent extends Component {

  constructor() {
    super();
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

  isLoaded(state) {
    return state.userIcons != null;
  }

  render() {
    return (
        <AsyncComponent isLoaded={this.isLoaded.bind(this) }
          loaded={ this.state.userIcons ?
              <span><img className="user" src={this.state.userIcons[this.props.name]} />{this.props.title}</span>
            : <span></span>} />
    )
  }
}