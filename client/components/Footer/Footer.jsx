import React, { Component } from 'react';
import TwoColumn from '../Layouts/TwoColumn';

class FooterComponent extends Component {
  render() {
    return (
      <div id="footer">
        <TwoColumn left={<h2>Explore <i className="fa fa-github"></i></h2>}
          right={
            <div>
              <p>
                <a href="https://github.com/OpenChatAlytics">Open ChatAlytics</a> is open source and available on GitHub.  Visit the relevant project(s) for more information on how to build, run and integrate with Open Chatalytics.  Feel free to request a feature or report a bug by creating a GitHub issue.  We also accept contributions via pull requests to the appriopriate projects.
              </p>
              <p>
                Open ChatAlytics is built upon many other open source projects, including the Stanford NLP Library, ... .
              </p>
              <p>Last updated 2016</p>
            </div>
          } />
      </div>
    );
  }
}

export default FooterComponent;
