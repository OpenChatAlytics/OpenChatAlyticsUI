import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TwoColumn from '../Layouts/TwoColumn';
import TwoColumnFixed from '../Layouts/TwoColumnFixed';
import Highcharts from 'highcharts';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import AsyncComponent from './Async';
import TableComponent from './Table';
import ChartJS, { Line, Bubble, Bar } from 'react-chartjs';

export default class EmojisComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="chatalytics" id="emojis">
        <EmojisSummaryComponent />
        <h3>Trending</h3>
        <p>Trending emojis represent the most popular emojis in use.</p>
        <TwoColumnFixed leftWidth='300px' left={<EmojisStatisticsComponent />}
          right={<EmojisTimeChart />} />
        <h3>User</h3>
        <p>The top emoji users.</p>
        <EmojisPerUserComponent />
        <h3>Room</h3>
        <p>Emoji spam.</p>
      </div>
    );
  }

}

class EmojisSummaryComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Emojis</h2>
        <p>
          : -)
        </p>
      </div>
    );
  }
}

class EmojisStatisticsComponent extends Component {

  constructor() {
    super();
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
  }

  isLoaded(state) {
    return state.trendingEmojis != null;
  }

  render() {
    return (
      <AsyncComponent isLoaded={this.isLoaded.bind(this) }
        loaded={
          <div>
            <h4>Top Emojis Past Year</h4>
            <TableComponent columns={['key', 'value']}
              aliases={['Emojis', 'Score']}
              data={ this.state.trendingEmojis } />
          </div>  }
        />
    );
  }
}

class EmojisPerUserComponent extends Component {

  constructor() {
    super();
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
  }

  isLoaded(state) {
    return state.emojisPerUser != null;
  }

  render() {
    return (
      <div>
        <div className="awards">
          <div style={{ float: 'left' }}>
            <div>
              <div style={{ float: 'left' }} className="award-one">1st</div>
              <div style={{ float: 'left' }}>
                <h2>@kbot</h2>
                <h3>0.378 emojis / message</h3>
              </div>
              <div style={{ clear: 'both' }} />
             </div>   
          </div>
          <div style={{ float: 'left' }}>
            <div>
              <div style={{ float: 'left' }} className="award-two">2nd</div>
              <div style={{ float: 'left' }}>
                <h2>@kbot</h2>
                <h3>0.378 emojis / message</h3>
              </div>
              <div style={{ clear: 'both' }} />
             </div>   
          </div>
          <div style={{ float: 'left' }}>
            <div>
              <div style={{ float: 'left' }} className="award-three">3rd</div>
              <div style={{ float: 'left' }}>
                <h2>@kbot</h2>
                <h3>0.378 emojis / message</h3>
              </div>
              <div style={{ clear: 'both' }} />
             </div>   
          </div>
          <div style={{ clear: 'both' }} />
        </div>
        <div className="entity-container">
          {[0, 1, 2, 3, 4, 5, 6].map((e) => {
            return <EntityMiniComponent />
          }) }
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    )
  }
}

class EntityMiniComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="entity-mini">
        <div className="entity-mini-title"> @psastras</div>
        <div className="entity-mini-summary">simple_smile foo gianiss cheese</div>
        <div className="entity-mini-subtitle">0.378 emojis / message</div>
        <div style={{ width: '7%', background: 'black', height: '5px' }} />
      </div>
    );
  }

}

class EmojisTimeChart extends Component {

  constructor() {
    super();
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
  }

  isLoaded(state) {
    return state.trendingEmojisOverTime != null;
  }

  render() {
    if (typeof Chart !== 'undefined') {
      Chart.defaults.global.defaultFontFamily = 'PTMono';
      Chart.defaults.global.defaultFontSize = 12;
      Chart.defaults.global.responsive = true;
      Chart.defaults.global.legend.position = 'bottom';
      // Chart.defaults.global.maintainAspectRatio = false;
    }
    let options = {
      responsive: true,
      tooltips: {
        mode: 'single',
      },
      hover: {
        mode: 'dataset'
      },
      elements: {
        point: {
          radius: 2
        }
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          stacked: false,
          scaleLabel: {
            display: true,
            labelString: 'Number Mentions'
          }
        }]
      }
    }
    return (
      <div>
        <h4>Top Emojis by Month</h4>
        <AsyncComponent isLoaded={this.isLoaded.bind(this) }
          loaded={ this.state.trendingEmojisOverTime ?
            <Line ref="chart" data={this.state.trendingEmojisOverTime.clone() }
              options={ options } />
            : <div />} />
      </div>
    );
  }
}