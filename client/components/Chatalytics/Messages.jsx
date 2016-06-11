import React, { Component } from 'react';
import TwoColumn from '../Layouts/TwoColumn';
import ThreeColumn from '../Layouts/ThreeColumn';
import LazyLoad from 'react-lazy-load';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import EasyTransition from 'react-easy-transition';
import Reactable from 'react-table';

class MessagesComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="chatalytics">
        <TwoColumn left={<h2>Messages</h2>}
          right={<div />} />
      </div>
    );
  }
}

export default MessagesComponent;
