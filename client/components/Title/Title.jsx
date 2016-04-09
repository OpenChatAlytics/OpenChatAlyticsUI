import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import { Parallax } from 'react-parallax';

class TitleComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div id="title">
        <div style={{ padding: '2em' }}>
          <div><h1>Open | ChatAlytics</h1></div>
          <table>
            <tbody>
              <tr>
                <td>35237</td><td>Messages Processed</td>
              </tr>
              <tr>
                <td>2315</td><td>Words Analyzed</td>
              </tr>
              <tr>
                <td>53</td><td>Unique Users</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TitleComponent;
