import React, { Component } from 'react';
import TwoColumnFixed from '../Layouts/TwoColumnFixed';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import AsyncComponent from './Async';
import TableComponent from './Table';
import { Line } from 'react-chartjs';
import SimilarityComponent from './Similarity';
import AltContainer from 'alt-container';
import DatePickerComponent from '../DatePicker';

export default class EntitiesComponent extends Component {
  render() {
    return (
      <div style={{ }} className="chatalytics" id="entities">
        <AltContainer store={MainStore}>
          <EntitiesSummaryComponent />
          <h3>Trending</h3>
          <p>Trending entities refer to the most popular topics across all chat rooms and all people.We show the most popular
            topics during the past year as well as the evolution of these topics over each month.</p>
          <TwoColumnFixed leftWidth="25%" left={<EntitiesStatisticsComponent />}
            right={<EntitiesTimeChart />}
          />
          <h3>Similarity</h3>
          <p>
            Users or rooms can be considered similar if they talk about the same things - in other words, if two different rooms or Users
            consistently mention the same group of entities, they are similar.  This is shown in the two matrices below.
          </p>
          <p>
            The more similar two items are, the larger the bubble.  Mouse over a bubble to see which items are being compared.
          </p>
          <DatePickerComponent
            onDateChanged={(starttime, endtime) => MainActions.fetchEntitySimilarities({ starttime, endtime })}
          />
          <TwoColumnFixed leftWidth="49%"
            left={<SimilarityComponent
              title="User Similarity by Entities Mentioned" similarity={this.props.userSimilarityByEntity}
            />}
            right={<SimilarityComponent
              title="Room Similarity by Entities Mentioned" similarity={this.props.roomSimilarityByEntity}
            />}
          />
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
        <p>
          Entities are sequences of words in a text which are the names of things, such as person
          and company names. Example entities might include the phrases "New York", "John", etc.
          Entities are extracted in real time as messages are received using the Stanford NLP library.
        </p>
      </div>
    );
  }
}

class EntitiesStatisticsComponent extends Component {
  render() {
    return (
      <AsyncComponent isLoaded={() => this.props.trendingTopics != null}
        loaded={
          <div>
            <h4>Top Entities Past Year</h4>
            <TableComponent
              columns={['key', 'value']}
              aliases={['Topics', 'Score']}
              data={this.props.trendingTopics}
            />
          </div>}
      />
    );
  }
}

class EntitiesTimeChart extends Component {
  render() {
    let options = {
      defaultFontFamily: 'PTMono',
      defaultFontSize: 12,
      responsive: true,
      legend: {
        position: 'bottom',
      },
      maintainAspectRatio: false,
      tooltips: {
        mode: 'single',
      },
      hover: {
        mode: 'dataset',
      },
      elements: {
        point: {
          radius: 2,
        },
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Month',
          },
        }],
        yAxes: [{
          stacked: false,
          scaleLabel: {
            display: true,
            labelString: 'Number Mentions',
          },
        }],
      },
    };
    return (
      <div>
        <h4>Top Entities by Month</h4>
        <AsyncComponent
          isLoaded={() => this.props.trendingTopicsOverTime != null}
          loaded={this.props.trendingTopicsOverTime ?
            <Line ref="chart" data={this.props.trendingTopicsOverTime.clone()}
              options={options} height="450"
            />
            : <div />}
        />
      </div>
    );
  }
}
