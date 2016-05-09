import React, { Component } from 'react';
import TwoColumn from '../Layouts/TwoColumn';
import TwoColumnFixed from '../Layouts/TwoColumnFixed';
import Highcharts from 'highcharts';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import AsyncComponent from './Async';
import TableComponent from './Table';
import ChartJS, { Line, Bubble } from 'react-chartjs';

export default class EntitiesComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="chatalytics" id="entities">
        <EntitiesSummaryComponent />
        <h3>Trending</h3>
        <p>Trending entities refer to the most popular topics across all chat rooms and all people.We show the most popular
          topics during the past year as well as the evolution of these topics over each month.</p>
        <TwoColumnFixed leftWidth='300px' left={<EntitiesStatisticsComponent />}
          right={<EntitiesTimeChart />} />

        <h3>Similarity</h3>
        <p>Entities are similar if they were mentioned by the same user or in the same room.
          We show this similarity as a matrix S, where entities A, B are similar if the value in row A, column B is large.   If A, B is zero, the entities are
          completely disimilar.  We then sort the similarity matrix by the second eigenvector of the Lapacian, which has the effect of
          grouping similar clusters of entities together.
        </p>
        <TwoColumnFixed leftWidth='50%' left={<EntitiesSimilarityChart />}
          right={<EntitiesSimilarityChart />} />
        <h3>Similarity Graph</h3>
        <p>We can also visualize similarity as a graph by drawing an edge if two entities are similar (a similarity matrix is essentially an adjacency matrix).</p> 
      </div>
    );
  }

}

class EntitiesSummaryComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Entities</h2>
        <p>Entities are sequences of words in a text which are the names of things, such as person and company names.
          Example entities might include the phrases "New York", "John", etc.Entities are extracted in real time as
          messages are received using the Stanford NLP library.
        </p>
      </div>
    );
  }

}

class EntitiesStatisticsComponent extends Component {

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
    return state.trendingTopics != null;
  }

  render() {
    return (
      <AsyncComponent isLoaded={this.isLoaded.bind(this) }
        loaded={
          <div>
            <h4>Top Entities Past Year</h4>
            <TableComponent columns={['key', 'value']}
              aliases={['Topics', 'Score']}
              data={ this.state.trendingTopics } />
          </div>  }
        />
    );
  }
}

class EntitiesTimeChart extends Component {

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
    return state.trendingTopicsOverTime != null;
  }

  render() {
    if (typeof Chart !== 'undefined') {
      Chart.defaults.global.defaultFontFamily = 'Quicksand';
      Chart.defaults.global.defaultFontSize = 14;
      Chart.defaults.global.responsive = true;
      Chart.defaults.global.legend.position = 'bottom';
      // Chart.defaults.global.maintainAspectRatio = false;
    }
    let options = {
      responsive: true,
      tooltips: {
        mode: 'label',
      },
      hover: {
        mode: 'label'
      },
      elements: {
        point: { 
          radius: 0
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
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Number Mentions'
          }
        }]
      }
    }
    return (
      <div>
        <h4>Top Entities by Month</h4>
        <AsyncComponent isLoaded={this.isLoaded.bind(this) }
          loaded={ this.state.trendingTopicsOverTime ?
            <Line ref="chart" data={this.state.trendingTopicsOverTime.clone() }
              options={ options } />
            : <div />} />
      </div>
    );
  }
}


class EntitiesSimilarityChart extends Component {

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
    return state.trendingTopicsOverTime != null;
  }

  render() {
    if (typeof Chart !== 'undefined') {
      Chart.defaults.global.defaultFontFamily = 'Quicksand';
      Chart.defaults.global.defaultFontSize = 14;
      Chart.defaults.global.responsive = true;
      Chart.defaults.global.legend.position = 'bottom';
      // Chart.defaults.global.maintainAspectRatio = false;
    }
    let labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let options = {
      responsive: true,
      tooltips: {
        mode: 'label',
      },
      hover: {
        mode: 'label'
      },
      elements: {
        point: {
          backgroundColor: 'rgba(65, 128, 255, 0.5)',
          hitRadius: 1,
          hoverRadius: 4,
          hoverBorderWidth: 1,
          radius: 10
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            min: 0,
            max: labels.length,
            stepSize: 1,
            autoSkip: false,
            callback: (value) => {
              return labels[value];
            }
          },
          scaleLabel: {
            display: false,
            labelString: 'Entity'
          }
        }],
        yAxes: [{
          ticks: {
            reverse: true,
            min: 0,
            max: labels.length,
            stepSize: 1,
            autoSkip: false,
            callback: (value) => {
              return labels[value];
            }
          },
          scaleLabel: {
            display: false,
            labelString: 'Entity'
          }
        }]
      },
      legend: {
        display: false
      }
    }
    let data = {
      datasets: [{
        data: [
          { x: 0, y: 0, r: 50 },
          { x: 0, y: 1, },
          { x: 1, y: 0 }, 
          { x: 1, y: 1 },
          { x: 2, y: 1, r: 76}]
      }],
      labels: ['label1', 'label2', 'label3', 'label4']
    };

    return (
      <div>
        <h4>Similarity by User</h4>
        <AsyncComponent isLoaded={this.isLoaded.bind(this) }
          loaded={ this.state.trendingTopicsOverTime ?
            <Bubble ref="chart" data={ data }
              width={100} height={100}
              options={ options } />
            : <div />} />
      </div>
    );
  }
}
