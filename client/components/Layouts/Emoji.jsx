import React, { Component } from 'react';
import MainStore from '../../stores/MainStore';
import AsyncComponent from '../Chatalytics/Async';

export default class EmojiComponent extends Component {

  constructor() {
    super();
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

  isLoaded(state) {
    return state.emojiIcons != null;
  }

  render() {
    return (
      <div>
        <AsyncComponent isLoaded={this.isLoaded.bind(this) }
          loaded={ this.state.emojiIcons ?
              <div>
                <img className="emoji" src={this.state.emojiIcons[this.props.name]} />
                <span>{this.props.name}</span>
              </div>
            : <span>{this.props.name}</span>} />
        
      </div>
    )
  }
}