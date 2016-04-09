import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import { Parallax } from 'react-parallax';
import MainActions from '../../actions/MainActions';

class TitleComponent extends Component {

  constructor() {
    super();
    
    // populates the main store which triggers renders on dependent components
    MainActions.fetchLocations();
  }

  render() {
    return (
      <Parallax bgImage={require('images/bg2.jpg') } strength={400}>
        <div id="title">
          <div style={{ padding: '2em', display: 'flex' }}>
            <div style={{ marginRight: '2em' }}>
              <img src={require('images/logo.png')} style={{ width: '4.5em' }} />
            </div>
            <div>
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
        </div>
      </Parallax>
    );
  }
}

export default TitleComponent;
