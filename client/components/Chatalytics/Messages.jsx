import React, { Component } from 'react';
import TwoColumn from 'components/Layouts/TwoColumn';
import ThreeColumn from 'components/Layouts/ThreeColumn';

class MessagesComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="chatalytics">
        <TwoColumn left={<h2>Messages</h2>}
                   right={<ThreeColumn left={<div><h3>Statistic A</h3><p>Short statistic description here</p><table><tbody><tr><td>35237</td><td>Messages Processed</td></tr><tr><td>2315</td><td>Words Analyzed</td></tr><tr><td>53</td><td>Unique Users</td></tr></tbody></table></div>}
                                       mid={<div><h3>Statistic B</h3><p>Short statistic description here</p><table><tbody><tr><td>35237</td><td>Messages Processed</td></tr><tr><td>2315</td><td>Words Analyzed</td></tr><tr><td>53</td><td>Unique Users</td></tr></tbody></table></div>} 
                                       right={<div><h3>Statistic C</h3><p>Short statistic description here</p><table><tbody><tr><td>35237</td><td>Messages Processed</td></tr><tr><td>2315</td><td>Words Analyzed</td></tr><tr><td>53</td><td>Unique Users</td></tr></tbody></table></div>} />}/>
      </div>
    );
  }
}

export default MessagesComponent;
