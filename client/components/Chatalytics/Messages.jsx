import React, { Component } from 'react';
import TwoColumn from '../Layouts/TwoColumn';
import ThreeColumn from '../Layouts/ThreeColumn';
import LazyLoad from 'react-lazy-load';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import EasyTransition from 'react-easy-transition';
import Reactable from 'react-table';
import AwardsComponent from '../Layouts/Awards';
import AsyncComponent from './Async';
import AltContainer from 'alt-container';
import humanize from 'humanize';

class MessagesComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="chatalytics">
        <AltContainer store={ MainStore }>
          <TwoColumn left={<h2>Messages</h2>}
            right={<div />} />
          <div style={{ textAlign: 'center', padding: '5em' }}>
            <h1>
              {this.props.totalMessages ?
                  humanize.numberFormat(this.props.totalMessages, 0) :
                  ""}
            </h1>
            <h2>Chat messages over the past year</h2>
          </div>
          <h3>User</h3>
          <p>The most talkative people in chat.</p>
          <MessagesPerUserComponent />
          <h3>Room</h3>
          <p>The most talkative rooms.</p>
          <MessagesPerRoomComponent />
        </AltContainer>
      </div>
    );
  }
}

class MessagesPerUserComponent extends Component {
  render() {
    return (
      <AsyncComponent isLoaded={ () => this.props.activeMessagesByUser != null }
        loaded={ this.props.activeMessagesByUser ?
          <AwardsComponent data={this.props.activeMessagesByUser } />
          : <div />} />
    )
  }
}

class MessagesPerRoomComponent extends Component {
  render() {
    return (
      <AsyncComponent isLoaded={ () => this.props.activeMessagesByRoom != null }
        loaded={ this.props.activeMessagesByRoom ?
          <AwardsComponent data={this.props.activeMessagesByRoom } />
          : <div />} />
    )
  }
}

export default MessagesComponent;
