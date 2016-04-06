import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';

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
          {this.props.right}
      </div>
    );
  }
}

TwoColumnComponent = connectToStores(TwoColumnComponent)

export default TwoColumnComponent;
