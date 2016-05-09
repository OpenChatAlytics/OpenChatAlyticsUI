import React, { Component } from 'react';

class TwoColumnComponentFixed extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div stye={{ width: '100%', height: 'auto' }}>
        <div style={{ width: this.props.leftWidth || '200px', marginRight: '0em', float: 'left' }}>
          {this.props.left}
        </div>
        <div style={{ width: this.props.rightWidth || 'auto', marginLeft: '1em', overflow: 'hidden' }}>
          {this.props.right}
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    );
  }
}

export default TwoColumnComponentFixed;
