import React, { Component } from 'react';
import TwoColumn from 'components/Layouts/TwoColumn';

class MessagesComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="chatalytics">
        <TwoColumn left={<h2>ChatAlytics</h2>}
          right={
            <p>
              <a href="https://github.com/OpenChatAlytics">ChatAlytics</a> is a realtime platform for processing <a href="https://hipchat.com/">HipChat</a> and <a href="https://slack.com">Slack</a> messages using Storm as the processing framework.
            </p>
          } />
      </div>
    );
  }
}

export default MessagesComponent;
