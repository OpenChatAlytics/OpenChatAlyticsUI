import React, { Component } from 'react';
import MainStore from '../../stores/MainStore';
import AsyncComponent from '../Chatalytics/Async';

export default class EmojiComponent extends Component {
  render() {
    return (
      <div>
        <AsyncComponent isLoaded={ () => this.props.emojiIcons != null }
          loaded={ this.props.emojiIcons ?
              <div>
                {this.props.emojiIcons.customEmojis[this.props.name] ? 
                  <img className="emoji" src={this.props.emojiIcons.customEmojis[this.props.name]} /> :
                  <span className="emoji">{this.props.emojiIcons.unicodeEmojis[this.props.name]}</span>}
                <span>{this.props.name}</span>
              </div>
            : <span>{this.props.name}</span>} />
      </div>
    )
  }
}