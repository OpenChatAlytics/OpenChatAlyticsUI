import React, { Component } from 'react';
import TwoColumn from 'components/Layouts/TwoColumn';

class AboutComponent extends Component {
  
  render() {
    return (
      <div id="about">
        <TwoColumn left={<h2>About</h2>} 
                   right={
                     <p>
                      <a href="https://github.com/OpenChatAlytics">ChatAlytics</a> is a realtime platform for processing <a href="https://hipchat.com/">HipChat</a> and <a href="https://slack.com">Slack</a> messages using Storm as the processing framework.
                     </p>
                    } />
      </div>
    );
  }
}

export default AboutComponent;
