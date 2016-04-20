import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
var Highcharts = require('highcharts');
import { Parallax } from 'react-parallax';
import MainActions from '../../actions/MainActions';
import MainStore from '../../stores/MainStore';

let series = null;
class TitleComponent extends Component {

  constructor() {
    super();

    // populates the main store which triggers renders on dependent components
    MainActions.fetchTrendingTopics();
    MainActions.subscribeEvents();

    this.state = MainStore.getState();
    
    // set up the graph render loop, this should be no less than ~1s otherwise the graph renderer tends
    // to bug out
    this.graphUpdate = setInterval(() => {
      if (series !== null && this.state.event !== null) {
         series.addPoint([(new Date()).getTime(), this.state.event.message_meter['1MinuteRate']], true, true);
      }
    }, 1500);
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

  render() {
    
    // todo: clean this up
    let timeDiff = 0;
    let unit = "minute";
    if (this.state.event) {
      timeDiff = ((new Date()).getTime() - this.state.event.start_time) / 1000 / 60;
      if (timeDiff < 5) {
        unit = "5 minutes";
      } else if (timeDiff < 15) {
        unit = "15 minutes";
      } else if (timeDiff < 30) {
        unit = "30 minutes";
      } else if (timeDiff < 60) {
        unit = "hour";
      } else if (timeDiff < 60 * 24) {
        unit = "day";
      } else if (timeDiff < 60 * 24 * 7) {
        unit = "week";
      } else if (timeDiff < 60 * 24 * 7 * 4) {
        unit = "month";
      } else if (timeDiff < 60 * 24 * 7 * 4 * 12) {
        unit = "year";
      } else {
        unit = "";
      }
    }
    return (
      <Parallax bgImage={require('images/bg3.jpg') } strength={600}>
        <div id="attribution"><a href="https://www.flickr.com/photos/28541561@N04/24974331285/in/photolist-quWXSU-qPDfC1-qLHc1S-qz6pAh-E3TYAH-yytE2e-D38Ub7-zHf1LS">Lone Tree, Lake Wanaka, New Zealand</a> by <a href="https://www.flickr.com/photos/28541561@N04/">Yani Dubin</a><br />Licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/">CC 2.0</a></div>
        <div id="title">
          <div style={{ padding: '2em', display: 'flex' }}>
            <div style={{ marginRight: '2em' }}>
              <img src={require('images/logo.png') } style={{ width: '4.5em' }} />
            </div>
            <div>
              <div><h1>Open | ChatAlytics</h1></div>
              <ReactHighcharts config={this.props.config} isPureConfig={true}></ReactHighcharts>
              <p>In the past {unit}</p>
              <table>
                <tbody>
                  <tr>
                    <td width={100}>{this.state.event ? this.state.event.message_count : 0}</td><td>Messages Processed </td>
                  </tr>
                  <tr>
                    <td>{this.state.event ? this.state.event.active_room_count : 0}</td><td>Active Rooms</td>
                  </tr>
                  <tr>
                    <td>{this.state.event ? this.state.event.active_user_count : 0}</td><td>Active Users</td>
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

TitleComponent.defaultProps = {
  config: {
    colors: ["#FAFAFA"],
    chart: {
      type: 'line',
      height: 75,
      marginLeft: 0,
      marginRight: 0,
      backgroundColor: null,
      animation: Highcharts.svg, // don't animate in old IE
      events: {
        load: function() {
          series = this.series[0];
        }
      }
    },
    title: { text: null },
    xAxis: { visible: false },
    yAxis: { visible: false },
    credits: { enabled: false },
    legend: { enabled: false },
    plotOptions: { line: { marker: { symbol: 'diamond' } } },
    series: [{
      name: 'Messages / s',
      data: (function() {
        // generate an array of random data, todo: this should be prebuffered from the server
        let data = [];
        let time = (new Date()).getTime();
        for (let i = -19; i <= 0; i++) {
          data.push({ x: time + i * 1000, y: 0 });
        }
        return data;
      } ())
    }]
  }
};

export default TitleComponent;
