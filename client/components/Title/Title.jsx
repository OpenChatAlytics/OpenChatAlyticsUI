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
  }

  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
    if (series !== null && state.event !== null) {
      series.addPoint([(new Date()).getTime(), state.event.message_summary['1MinuteRate']], true, true);
    }
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
    plotOptions: {
      line: {
        marker: {
          symbol: 'diamond'
        }
      }
    },
    series: [{
      name: 'Random data',
      data: (function() {
        // generate an array of random data
        var data = [],
          time = (new Date()).getTime(),
          i;

        for (i = -19; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: Math.random()
          });
        }
        return data;
      } ())
    }]
  }
};

export default TitleComponent;
