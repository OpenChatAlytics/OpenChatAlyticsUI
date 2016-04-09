import React, { Component } from 'react';

class TwoColumnComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
        <div style={{ paddingRight: '2em', flex: '0 0 20em ' }}>
          {this.props.left}
        </div>
        <div style={{ flex: '1 0' }}>
          {this.props.right}
        </div>
      </div>
    );
  }
}

export default TwoColumnComponent;
