import React, { Component } from 'react';
import TwoColumn from '../Layouts/TwoColumn';
import Highcharts from 'highcharts';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import AsyncComponent from './Async';

export default class EntitiesComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="chatalytics" id="entities">
        <TwoColumn left={<EntitiesSummaryComponent />}
          right={<EntitiesStatisticsComponent />} />
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
        <p>Entities are sequences of words in a text which are the names of things, such as person and company names.</p>
      </div>
    );
  }

}

class TableComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Trending Topics {this.state.trendingTopics}</h3>
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
    console.log(this.state.trendingTopics);
    return (
      <AsyncComponent isLoaded={this.isLoaded.bind(this) } 
                      loaded={ <h3>sdf</h3>  }
                      />
    );
  }

}