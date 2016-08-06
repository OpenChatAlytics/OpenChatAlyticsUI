import React, { Component } from 'react';

class ThreeColumnComponent extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
        <div style={{ paddingRight: '2em', flex: '1 0' }}>
          {this.props.left}
        </div>
        <div style={{ paddingRight: '2em', flex: '1 0' }}>
          {this.props.mid}
        </div>
        <div style={{ paddingRight: '0em', flex: '1 0' }}>
          {this.props.right}
        </div>
      </div>
    );
  }
}
export default ThreeColumnComponent;
