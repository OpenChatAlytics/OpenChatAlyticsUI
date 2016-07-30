import React, { Component } from 'react';
import AltContainer from 'alt-container';
import MainStore from '../../stores/MainStore';

class TwoColumnComponentFixed extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div stye={{ width: '100%', height: 'auto' }}>
        <div style={{ width: this.props.leftWidth || '200px', marginRight: this.props.marginRight || '0em', float: 'left' }}>
          <AltContainer store={ MainStore }>
            {this.props.left}
          </AltContainer>
        </div>
        <div style={{ width: this.props.rightWidth || 'auto', marginLeft: this.props.marginLeft || '1em', overflow: 'hidden' }}>
          <AltContainer store={ MainStore }>
            {this.props.right}
          </AltContainer>
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    );
  }
}

export default TwoColumnComponentFixed;
