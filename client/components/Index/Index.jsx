import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import Title from '../Title/Title';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Messages from '../Chatalytics/Messages';
import Entities from '../Chatalytics/Entities';
import Emojis from '../Chatalytics/Emojis';

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
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }
  
  render() {
    return (
      <div>
        <Title />
        <About />
        <Messages />
        <Entities />
        <Emojis />
        <Footer />
      </div>
    );
  }
}

IndexComponent = connectToStores(IndexComponent)

export default IndexComponent;
