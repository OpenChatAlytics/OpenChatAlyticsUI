import alt from '../alt';
import MainSource from '../sources/MainSource';
import moment from 'moment';

class MainActions {

  // Subscribes to the web event stream
  subscribeEvents() {
    return (dispatch) => {
      dispatch();
      MainSource.subscribeEvents(this.updateEvents);
    }
  }
  
  updateEvents(event) {
    return event;
  }

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
  
  fetchTrendingTopicsOverTime() {
    return (dispatch) => {
      dispatch();
      
      Promise.all([
          MainSource.fetchTrendingTopics({ n: 15, starttime: '2016-01-01', endtime: '2016-02-01' }), 
          MainSource.fetchTrendingTopics({ n: 15, starttime: '2016-02-01', endtime: '2016-03-01' }), 
          MainSource.fetchTrendingTopics({ n: 15, starttime: '2016-03-01', endtime: '2016-04-01' }),
          MainSource.fetchTrendingTopics({ n: 15, starttime: '2016-04-01', endtime: '2016-05-01' }),
          MainSource.fetchTrendingTopics({ n: 15, starttime: '2016-05-01', endtime: '2016-06-01' }),
          MainSource.fetchTrendingTopics({ n: 15, starttime: '2016-06-01', endtime: '2016-07-01' }),
          MainSource.fetchTrendingTopics({ n: 15, starttime: '2016-07-01', endtime: '2016-08-01' }),
          MainSource.fetchTrendingTopics({ n: 15, starttime: '2016-08-01', endtime: '2016-09-01' }),
          MainSource.fetchTrendingTopics({ n: 15, starttime: '2016-09-01', endtime: '2016-10-01' }),
          MainSource.fetchTrendingTopics({ n: 15, starttime: '2016-10-01', endtime: '2016-11-01' }),
          MainSource.fetchTrendingTopics({ n: 15, starttime: '2016-11-01', endtime: '2016-12-01' }),
          MainSource.fetchTrendingTopics({ n: 15, starttime: '2016-12-01', endtime: '2017-01-01' })
        ]).then((topics) => { 
        this.updateTrendingTopicsOverTime({ topics: topics, times: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] });
      }).catch((errorMessage) => {
        this.trendingTopicsOverTimeFailed(errorMessage);
      });
    }
  }
  
  updateTrendingTopicsOverTime(topicsOverTime) {
    return topicsOverTime;
  }

  trendingTopicsFailed(errorMessage) {
    return errorMessage;
  }
  
  trendingTopicsOverTimeFailed(errorMessage) {
    return errorMessage;
  }
}

module.exports = alt.createActions(MainActions);
