import React, { Component } from 'react';
import MainStore from '../../stores/MainStore';
import EasyTransition from 'react-easy-transition';
import AltContainer from 'alt-container';

/**
 * Component which will display a loading icon while data is being
 * fetched.  Once fetched, the regular component will be displayed.
 *
 * Users should provide this component with an isLoaded(state)
 * property function.
 */

export default class AsyncComponent extends Component {
  constructor(props) {
    super(props);
    this.state = MainStore.getState();
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
      <EasyTransition
        path={location.pathname}
        initialStyle={{ opacity: 0 }}
        transition="opacity 1s ease-in"
        finalStyle={{ opacity: 1 }}
      >
        {this.props.isLoaded(this.state) ?
          <AltContainer store={MainStore}>
            {this.props.loaded}
          </AltContainer> :
          <SpinnerComponent />
        }
      </EasyTransition>
    );
  }
}

class SpinnerComponent extends Component {
  render() {
    return (
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    );
  }
}
