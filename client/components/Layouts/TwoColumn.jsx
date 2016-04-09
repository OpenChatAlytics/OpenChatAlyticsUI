import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import EasyTransition from 'react-easy-transition';

class TwoColumnComponent extends Component {

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

TwoColumnComponent = connectToStores(TwoColumnComponent)

export default TwoColumnComponent;
