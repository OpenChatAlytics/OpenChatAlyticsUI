import React, { Component } from 'react';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import Title from '../Title/Title';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Messages from '../Chatalytics/Messages';
import Entities from '../Chatalytics/Entities';
import Emojis from '../Chatalytics/Emojis';
import AltContainer from 'alt-container';

class IndexComponent extends Component {
  render() {
    return (
      <AltContainer store={MainStore}>
        <Title />
        <About />
        <Messages />
        <Entities />
        <Emojis />
        <Footer />
      </AltContainer>
    );
  }
}

export default IndexComponent;
