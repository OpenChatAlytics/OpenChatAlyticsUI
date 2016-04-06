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
      <div style={{ display: 'flex', height: '100%' }}>
        {this.props.left}
        <EasyTransition
          path={location.pathname}
          initialStyle={{ opacity: 0, transform: 'translateY(5px)' }}
          transition="opacity 0.25s ease-in-out, transform 0.15s ease-out"
          finalStyle={{ opacity: 1, transform: 'translateY(0px)' }}
          >
          {this.props.right}
        </EasyTransition>
      </div>
    );
  }
}

TwoColumnComponent = connectToStores(TwoColumnComponent)

export default TwoColumnComponent;
