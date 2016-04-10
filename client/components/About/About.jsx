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
                The Open ChatAlytics Project is split into three main components. Open ChatAlytics Compute processess and analyzes messages in real time. Open ChatAlytics Web provides an interface for web based applications to access the analyzed content.  Open ChatAlytics UI is built on top of Open ChatAlytics Web and displays the processed data.
              </p>
              <p>Questions? Feel free to <a href="https://gitter.im/OpenChatAlytics">join us on Gitter</a>.</p>
              <p>Core contributors: <a href="https://github.com/gneokleo">Giannis Neokleous</a>, <a href="https://github.com/psastras">Paul Sastrasinh</a>.</p>
            </div>
          } />
      </div>
    );
  }
}

export default AboutComponent;
