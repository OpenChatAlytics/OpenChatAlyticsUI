import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
var Highcharts = require('highcharts');
import { Parallax } from 'react-parallax';
import MainActions from '../../actions/MainActions';
import MainStore from '../../stores/MainStore';
import humanize from 'humanize';

let series = null;
class TitleComponent extends Component {

  constructor() {
    super();

    // populates the main store which triggers renders on dependent components
    MainActions.fetchTrendingTopics();
    MainActions.fetchTrendingEmojis();
    MainActions.fetchTrendingTopicsOverTime();
    MainActions.fetchTrendingEmojisOverTime();
    MainActions.subscribeEvents();
    MainActions.fetchSimilarities();
    MainActions.fetchActiveEmojisByUser();
    MainActions.fetchActiveEmojisByRoom();
    MainActions.fetchAllEmojis();

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
              <p>{this.state.event ? `Since ${humanize.relativeTime(this.state.event.start_time / 1000)},` : ""}</p>
              {this.state.event ? <TitleSummary messageCount={this.state.event.message_count}
                activeRoomCount={this.state.event.active_room_count}
                activeUserCount={this.state.event.active_user_count} /> : ""}
            </div>
          </div>
        </div>
      </Parallax>
    );
  }
}

/*
 * Stateless component displayed on the title page rendering the real time summary of
 * analytics.  
 */
class TitleSummary extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td width={100}>{this.props.messageCount}</td><td>Messages Processed </td>
          </tr>
          <tr>
            <td>{this.props.activeRoomCount}</td><td>Active Rooms</td>
          </tr>
          <tr>
            <td>{this.props.activeUserCount}</td><td>Active Users</td>
          </tr>
        </tbody>
      </table>
    )
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
        load: function () {
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
      data: (function () {
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
