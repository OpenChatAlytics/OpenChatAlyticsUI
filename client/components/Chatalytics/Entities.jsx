import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TwoColumn from '../Layouts/TwoColumn';
import TwoColumnFixed from '../Layouts/TwoColumnFixed';
import Highcharts from 'highcharts';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import AsyncComponent from './Async';
import TableComponent from './Table';
import ChartJS, { Line, Bubble } from 'react-chartjs';
import Viva from 'vivagraphjs';
import AltContainer from 'alt-container';

export default class EntitiesComponent extends Component {
  render() {
    return (
      <div className="chatalytics" id="entities">
        <AltContainer store={ MainStore }>
          <EntitiesSummaryComponent />
          <h3>Trending</h3>
          <p>Trending entities refer to the most popular topics across all chat rooms and all people.We show the most popular
            topics during the past year as well as the evolution of these topics over each month.</p>
          <TwoColumnFixed leftWidth='25%' left={<EntitiesStatisticsComponent />}
            right={<EntitiesTimeChart />} />
          <h3>Similarity</h3>
          <p>Entities are similar if they were mentioned by the same user or in the same room.
            We show this similarity as a matrix S, where entities A, B are similar if the value in row A, column B is large.If A, B is zero, the entities are
            completely disimilar.We then sort the similarity matrix by the second eigenvector of the Lapacian, which has the effect of
            grouping similar clusters of entities together.
          </p>
          <TwoColumnFixed leftWidth='50%' left={<EntitiesSimilarityChart />}
            right={<EntitiesSimilarityChart />} />
          <h3>Similarity Graph</h3>
          <p>We can also visualize similarity as a graph by drawing an edge if two entities are similar (a similarity matrix is essentially an adjacency matrix).</p>
        </AltContainer>
      </div>
    );
  }
}

class EntitiesSummaryComponent extends Component {
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
  render() {
    return (
      <AsyncComponent isLoaded={ () => this.props.trendingTopics != null }
        loaded={
          <div>
            <h4>Top Entities Past Year</h4>
            <TableComponent columns={['key', 'value']}
              aliases={['Topics', 'Score']}
              data={ this.props.trendingTopics } />
          </div>  }
        />
    );
  }
}

class EntitiesTimeChart extends Component {
  render() {
    if (typeof Chart !== 'undefined') {
      Chart.defaults.global.defaultFontFamily = 'PTMono';
      Chart.defaults.global.defaultFontSize = 12;
      Chart.defaults.global.responsive = true;
      Chart.defaults.global.legend.position = 'bottom';
      Chart.defaults.global.maintainAspectRatio = false;
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
        <h4>Top Entities by Month</h4>
        <AsyncComponent isLoaded={ () => this.props.trendingTopicsOverTime != null }
          loaded={ this.props.trendingTopicsOverTime ?
            <Line ref="chart" data={this.props.trendingTopicsOverTime.clone() }
              options={ options } height="450" />
            : <div />} />
      </div>
    );
  }
}

class EntitiesGraphComponent extends Component {

  constructor(props) {
    super(props);
    this.state = MainStore.getState();
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);
  }

  onChange(state) {
    if (state.similarities != null) {
      let similarities = state.similarities.clone();
      let container = ReactDOM.findDOMNode(this);
      var graph = Viva.Graph.graph();
      similarities.datasets[0].data.forEach((data) => {
        if (data.r > 0.05) {
          graph.addLink(data.x, data.y);
        }
      })
      // graph.addLink("foo", "asd");

      var graphics = Viva.Graph.View.svgGraphics();

      // specify where it should be rendered:
      var renderer = Viva.Graph.View.renderer(graph, {
        graphics: graphics,
        container: container
      });
      renderer.run();
    }
    this.setState(state);
  }

  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));

  }

  render() {
    return (
      <div style={{ width: '100%', height: '300' }} />
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
    return state.similarities != null;
  }
  
  filterSimilarities(similarities, entities) {
    // console.log(entities);
    // console.log(similarities);
  }

  render() {
    if (typeof Chart !== 'undefined') {
      Chart.defaults.global.defaultFontFamily = 'PTMono';
      Chart.defaults.global.defaultFontSize = 12;
      Chart.defaults.global.responsive = true;
      Chart.defaults.global.legend.position = 'bottom';
      // Chart.defaults.global.maintainAspectRatio = false;
    }

    let labels = this.state.similarities ? this.state.similarities.clone().labels : [];
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
          backgroundColor: 'rgba(65, 128, 255, 0.05)',
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
    if (this.state.similarities && this.state.trendingTopics)
      this.filterSimilarities(this.state.similarities.clone(), this.state.trendingTopics);
    return (<div />)

    // return (
    //   <div>
    //     <h4>Similarity by User</h4>
    //     <AsyncComponent isLoaded={this.isLoaded.bind(this) }
    //       loaded={ this.state.similarities ?
    //         <Bubble ref="chart" data={ this.state.similarities.clone() }
    //           width={100} height={100}
    //           options={ options } />
    //         : <div />} />
    //   </div>
    // );
  }
}
