import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
var Highcharts = require('highcharts');
import { Parallax } from 'react-parallax';
import MainActions from '../../actions/MainActions';

class TitleComponent extends Component {

  constructor() {
    super();

    // populates the main store which triggers renders on dependent components
    MainActions.fetchTrendingTopics();
  }

  render() {
    return (
      <Parallax bgImage={require('images/bg2.jpg') } strength={400}>
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
        load: function() {

          // set up the updating of the chart each second
          var series = this.series[0];
          setInterval(function() {
            var x = (new Date()).getTime(), // current time
              y = Math.random();
            series.addPoint([x, y], true, true);
          }, 1000);
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
