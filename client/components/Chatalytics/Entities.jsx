import React, { Component } from 'react';
import TwoColumn from '../Layouts/TwoColumn';
import TwoColumnFixed from '../Layouts/TwoColumnFixed';
import Highcharts from 'highcharts';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import AsyncComponent from './Async';
import TableComponent from './Table';
import ChartJS, { Line } from 'react-chartjs';

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
        <TwoColumn left={<EntitiesStatisticsComponent />}
          right={<EntitiesTimeChart />} />
          
        <h3>Similar</h3>
        <p>We show entities based on their similarity to each other.  The simlarity is based on who mentioned each entity and what room they were mentioned in.
        Given this information, we can form a similarity matrix where entities A and B are similar if they were mentioned in the same room or by the same
        user (and thus cell (a, b) has a large value if the entities are similar, or is zero if the entities are completely dissimilar).  We then sort the rows and columns of the similarity matrix by the second eigenvector of the matrix which groups
        clusters of similar entities together.
        </p>
        <TwoColumn left={<EntitiesStatisticsComponent />}
          right={<EntitiesTimeChart />} />
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
            <h4>Top Entities</h4>
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
        <h4>Top Entities of Each Month</h4>
        <AsyncComponent isLoaded={this.isLoaded.bind(this) }
          loaded={ this.state.trendingTopicsOverTime ?
            <Line ref="chart" data={this.state.trendingTopicsOverTime.clone() }
              options={ options } />
            : <div />} />
      </div>
    );
  }
}
