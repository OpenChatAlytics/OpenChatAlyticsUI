import alt from '../alt';
import MainActions from '../actions/MainActions';

class MainStore {
  constructor() {
    this.trendingTopics = null;
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateTrendingTopics: MainActions.UPDATE_TRENDING_TOPICS,
      handleFetchTrendingTopics: MainActions.FETCH_TRENDING_TOPICS,
      handleTrendingTopicsFailed: MainActions.TRENDING_TOPICS_FAILED
    });
  }
  
  handleUpdateTrendingTopics(trendingTopics) {
    this.trendingTopics = trendingTopics;
    this.errorMessage = null;
  }
  
  handleFetchTrendingTopics() {
    this.trendingTopics = null;
  }

  handleTrendingTopicsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(MainStore, 'MainStore');