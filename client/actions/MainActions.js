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

  fetchTrendingEmojis() {
    return (dispatch) => {
      dispatch();

      MainSource.fetchTrendingEmojis()
        .then((emojis) => {
          this.updateTrendingEmojis(emojis);
        })
        .catch((errorMessage) => {
          this.trendingEmojisFailed(errorMessage);
        });
    }
  }

  updateTrendingEmojis(emojis) {
    return emojis;
  }

  updateSimilarities(similarities) {
    return similarities;
  }

  updateUserSimilarityByEntity(similarities) {
    return similarities;
  }

  updateRoomSimilarityByEntity(similarities) {
    return similarities;
  }

  fetchSimilarities() {
    return (dispatch) => {
      dispatch();
      
      MainSource.fetchUserSimilarityByEntity()
        .then((similarities) => {
          this.updateUserSimilarityByEntity(similarities);
        })
        .catch((errorMessage) => {
          this.fetchSimilaritiesFailed(errorMessage);
        });

      MainSource.fetchRoomSimilarityByEntity()
        .then((similarities) => {
          this.updateRoomSimilarityByEntity(similarities);
        })
        .catch((errorMessage) => {
          this.fetchSimilaritiesFailed(errorMessage);
        });
    }
  }

  fetchTrendingTopicsOverTime(args = {
    startDate: moment().subtract(12, 'months').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD')
  }) {
    return (dispatch) => {
      dispatch();

      let startDate = moment(args.startDate);
      let endDate = moment(startDate);
      endDate.add(1, 'months');

      let dates = [];
      while (startDate < moment(args.endDate)) {
        dates.push({
          realDate: moment(startDate),
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD')
        })
        startDate.add(1, 'months');
        endDate.add(1, 'months');
      }

      let requests = dates.map((times) => {
        return new Promise((resolve) => resolve(MainSource.fetchTrendingTopics({
          n: 25,
          starttime: times.startDate,
          endtime: times.endDate
        })));
      });

      let labels = dates.map(date => {
        return date.realDate.format('MMMM')
      })

      Promise.all(requests).then((topics) => {
        this.updateTrendingTopicsOverTime({ topics: topics, times: labels });
      }).catch((errorMessage) => {
        this.trendingTopicsOverTimeFailed(errorMessage);
      });
    }
  }

  updateTrendingTopicsOverTime(topicsOverTime) {
    return topicsOverTime;
  }

  fetchTrendingEmojisOverTime(args = {
    startDate: moment().subtract(12, 'months').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD')
  }) {
    return (dispatch) => {
      dispatch();

      let startDate = moment(args.startDate);
      let endDate = moment(startDate);
      endDate.add(1, 'months');

      let dates = [];
      while (startDate < moment(args.endDate)) {
        dates.push({
          realDate: moment(startDate),
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD')
        })
        startDate.add(1, 'months');
        endDate.add(1, 'months');
      }

      let requests = dates.map((times) => {
        return new Promise((resolve) => resolve(MainSource.fetchTrendingEmojis({
          n: 25,
          starttime: times.startDate,
          endtime: times.endDate
        })));
      });

      let labels = dates.map(date => {
        return date.realDate.format('MMMM')
      })

      Promise.all(requests).then((emojis) => {
        this.updateTrendingEmojisOverTime({ emojis: emojis, times: labels });
      }).catch((errorMessage) => {
        this.trendingEmojisOverTimeFailed(errorMessage);
      });
    }
  }

  updateTrendingEmojisOverTime(emojisOverTime) {
    return emojisOverTime;
  }

  fetchActiveEmojisByUser() {
    return (dispatch) => {
      dispatch();

      MainSource.fetchActiveEmojisByUser()
        .then((topics) => {
          this.updateActiveEmojisByUser(topics);
        })
        .catch((errorMessage) => {
          this.activeEmojisByUserFailed(errorMessage);
        });
    }
  }

  updateActiveEmojisByUser(activeEmojisUser) {
    return activeEmojisUser;
  }

  activeEmojisByUserFailed(errorMessage) {
    return errorMessage;
  }

  fetchActiveEmojisByRoom() {
    return (dispatch) => {
      dispatch();

      MainSource.fetchActiveEmojisByRoom()
        .then((topics) => {
          this.updateActiveEmojisByRoom(topics);
        })
        .catch((errorMessage) => {
          this.activeEmojisByRoomFailed(errorMessage);
        });
    }
  }

  updateActiveEmojisByRoom(activeEmojisRoom) {
    return activeEmojisRoom;
  }

  activeEmojisByRoomFailed(errorMessage) {
    return errorMessage;
  }

  fetchAllEmojis() {
    return (dispatch) => {
      dispatch();

      MainSource.fetchAllEmojis()
        .then((topics) => {
          this.updateAllEmojis(topics);
        })
        .catch((errorMessage) => {
          this.allEmojisFailed(errorMessage);
        });
    }
  }

  updateAllEmojis(allEmojis) {
    return allEmojis;
  }

  allEmojisFailed(errorMessage) {
    return errorMessage;
  }

  fetchEmojiIcons() {
    return (dispatch) => {
      dispatch();

      MainSource.fetchEmojiIcons()
        .then((icons) => {
          this.updateEmojiIcons(icons);
        })
        .catch((errorMessage) => {
          this.emojiIconsFailed(errorMessage);
        });
    }
  }

  updateEmojiIcons(icons) {
    return icons;
  }

  emojiIconsFailed(errorMessage) {
    return errorMessage;
  }

  fetchUserIcons() {
    return (dispatch) => {
      dispatch();

      MainSource.fetchUserIcons()
        .then((icons) => {
          this.updateUserIcons(icons);
        })
        .catch((errorMessage) => {
          this.userIconsFailed(errorMessage);
        });
    }
  }

  updateUserIcons(icons) {
    return icons;
  }

  userIconsFailed(errorMessage) {
    return errorMessage;
  }

  trendingTopicsFailed(errorMessage) {
    return errorMessage;
  }

  trendingEmojisFailed(errorMessage) {
    return errorMessage;
  }

  trendingTopicsOverTimeFailed(errorMessage) {
    return errorMessage;
  }

  trendingEmojisOverTimeFailed(errorMessage) {
    return errorMessage;
  }

  fetchSimilaritiesFailed(errorMessage) {
    return errorMessage;
  }
}

module.exports = alt.createActions(MainActions);
