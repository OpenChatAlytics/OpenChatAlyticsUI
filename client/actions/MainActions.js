import alt from '../alt';
import MainSource from '../sources/MainSource'

class MainActions {
  
  fetchTrendingTopics() {
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      dispatch();
      MainSource.fetchTrendingTopics()
        .then((topics) => {
          // we can access other actions within our action through `this.actions`
          this.updateTrendingTopics(topics);
        })
        .catch((errorMessage) => {
          this.trendingTopicsFailed(errorMessage);
        });
      }
  }
  
  updateTrendingTopics(topics) {
    return topics;
  }
  
  trendingTopicsFailed(errorMessage) {
    return errorMessage;
  }
}

module.exports = alt.createActions(MainActions);