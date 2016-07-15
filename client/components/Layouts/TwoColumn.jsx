import React, { Component } from 'react';
import AltContainer from 'alt-container';
import MainStore from '../../stores/MainStore';

class TwoColumnComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
        <div style={{ paddingRight: '2em', flex: '0 0 20em ' }}>
          <AltContainer store={ MainStore }>
            {this.props.left}
          </AltContainer>
        </div>
        <div style={{ flex: '1 0' }}>
          <AltContainer store={ MainStore }>
            {this.props.right}
          </AltContainer>
        </div>
      </div>
    );
  }
}

export default TwoColumnComponent;
