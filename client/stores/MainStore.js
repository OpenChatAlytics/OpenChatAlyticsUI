import alt from '../alt';
import MainActions from '../actions/MainActions';
import Colors from './Colors'
import Color from 'color';

class MainStore {
  constructor() {
    this.trendingTopics = null;
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateTrendingTopics: MainActions.UPDATE_TRENDING_TOPICS,
      handleFetchTrendingTopics: MainActions.FETCH_TRENDING_TOPICS,
      handleTrendingTopicsFailed: MainActions.TRENDING_TOPICS_FAILED,

      handleUpdateTrendingTopicsOverTime: MainActions.UPDATE_TRENDING_TOPICS_OVER_TIME,
      handleFetchTrendingTopicsOverTime: MainActions.FETCH_TRENDING_TOPICS_OVER_TIME,
      handleTrendingTopicsOverTimeFailed: MainActions.TRENDING_TOPICS_OVER_TIME_FAILED,

      handleUpdateEvents: MainActions.UPDATE_EVENTS,
      handleSubscribeEvents: MainActions.SUBSCRIBE_EVENTS,
    });
  }

  handleUpdateEvents(event) {
    this.event = event;
  }

  handleSubscribeEvents() {
    this.event = null;
  }

  handleUpdateTrendingTopics(trendingTopics) {
    this.trendingTopics = Object.keys(trendingTopics).map((key) => {
      return { key: key, value: trendingTopics[key] };
    });
    this.errorMessage = null;
  }

  handleFetchTrendingTopics() {
    this.trendingTopics = null;
  }

  handleTrendingTopicsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateTrendingTopicsOverTime(data) {
    // transform the data into one readable by charting libs

    let datasets = {}
    data.topics.forEach((timeSlice) => {
      Object.keys(timeSlice).forEach((dataset) => {
        if (datasets[dataset]) {
          datasets[dataset].data.push(timeSlice[dataset]);
        } else {
          datasets[dataset] = {
            label: dataset,
            data: [timeSlice[dataset]]
          }
        }
      });
    })
    
    this.trendingTopicsOverTime = {
      clone: () => {
        return {
          labels: data.times,
          datasets: Object.keys(datasets).map((key, i) => {
            return {
              label: datasets[key].label,
              fill: true,
              tension: 0,
              pointBackgroundColor: Colors.zeileis[i],
              backgroundColor: Colors.zeileis[i],
              data: datasets[key].data
            }
          })
        }
      }
    }
    this.errorMessage = null;
  }

  handleFetchTrendingTopicsOverTime() {
    this.trendingTopicsOverTime = null;
  }

  handleTrendingTopicsOverTimeFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(MainStore, 'MainStore');