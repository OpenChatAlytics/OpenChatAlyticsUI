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
      <div id="content">
        <h1>Open | ChatAlytics</h1>
        <p><a href="https://github.com/OpenChatAlytics">ChatAlytics</a> is a realtime platform for processing <a href="https://hipchat.com/">HipChat</a> and <a href="https://slack.com">Slack</a> messages using Storm as the processing framework.</p>
        <hr />
      </div>
    );
  }
}

IndexComponent = connectToStores(IndexComponent)

export default IndexComponent;
