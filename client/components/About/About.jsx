import React, { Component } from 'react';
import TwoColumn from '../Layouts/TwoColumn';

class AboutComponent extends Component {

  render() {
    return (
      <div id="about">
        <TwoColumn left={<h2>About <i className="fa fa-info-circle"></i></h2>}
          right={
            <div>
              <p>
                <a href="https://github.com/OpenChatAlytics">Open ChatAlytics</a> is a realtime platform for processing <a href="https://hipchat.com/">HipChat</a> and <a href="https://slack.com">Slack</a> messages using Apache Storm as the processing framework.
              </p>
              <p>
                 This page is a visual sample of some of the statistics and data made available from the Open Chatalytics platform.  This raw data includes information about
                 messages, rooms, users and various derived statistics such as user and room similarity.
              </p>
            </div>
          } />
      </div>
    );
  }
}

export default AboutComponent;
