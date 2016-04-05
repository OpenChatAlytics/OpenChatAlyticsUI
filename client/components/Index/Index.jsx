import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';

class IndexComponent extends Component {
  
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
    
    MainActions.fetchLocations();
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);
  }
  
  onChange(state) {
    this.setState(state);
  }
  
  render() {
    return (
      <section>
        <h1>Index</h1>
        <ul>
          {this.state.locations.map((location, i) => {
            return (
              <li key={i}>{location.name}</li>
            );
          })}
        </ul>
      </section>
    );
  }
}

IndexComponent = connectToStores(IndexComponent)

export default IndexComponent;
