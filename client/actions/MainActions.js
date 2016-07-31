import alt from '../alt';
import MainSource from '../sources/MainSource';
import moment from 'moment';
import _ from 'lodash';

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

  fetchTrendingTopics(query) {
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      dispatch();

      MainSource.fetchTrendingTopics(query)
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

  fetchTrendingEmojis(query) {
    return (dispatch) => {
      dispatch();

      MainSource.fetchTrendingEmojis(query)
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

  updateUserSimilarityByEmoji(similarities) {
    return similarities;
  }

  updateRoomSimilarityByEmoji(similarities) {
    return similarities;
  }

  fetchEntitySimilarities(query) {
    return (dispatch) => {
      dispatch();
      MainSource.fetchUserSimilarityByEntity(query)
        .then((similarities) => {
          this.updateUserSimilarityByEntity(similarities);
        })
        .catch((errorMessage) => {
          this.fetchSimilaritiesFailed(errorMessage);
        });

      MainSource.fetchRoomSimilarityByEntity(query)
        .then((similarities) => {
          this.updateRoomSimilarityByEntity(similarities);
        })
        .catch((errorMessage) => {
          this.fetchSimilaritiesFailed(errorMessage);
        });
    };
  }

  fetchEmojiSimilarities(query) {
    return (dispatch) => {
      dispatch();
      MainSource.fetchUserSimilarityByEmoji(query)
        .then((similarities) => {
          this.updateUserSimilarityByEmoji(similarities);
        })
        .catch((errorMessage) => {
          this.fetchSimilaritiesFailed(errorMessage);
        });

      MainSource.fetchRoomSimilarityByEmoji(query)
        .then((similarities) => {
          this.updateRoomSimilarityByEmoji(similarities);
        })
        .catch((errorMessage) => {
          this.fetchSimilaritiesFailed(errorMessage);
        });
    };
  }

  fetchSimilarities(query) {
    return (dispatch) => {
      dispatch();

      MainSource.fetchUserSimilarityByEntity(query)
        .then((similarities) => {
          this.updateUserSimilarityByEntity(similarities);
        })
        .catch((errorMessage) => {
          this.fetchSimilaritiesFailed(errorMessage);
        });

      MainSource.fetchRoomSimilarityByEntity(query)
        .then((similarities) => {
          this.updateRoomSimilarityByEntity(similarities);
        })
        .catch((errorMessage) => {
          this.fetchSimilaritiesFailed(errorMessage);
        });

      MainSource.fetchUserSimilarityByEmoji(query)
        .then((similarities) => {
          this.updateUserSimilarityByEmoji(similarities);
        })
        .catch((errorMessage) => {
          this.fetchSimilaritiesFailed(errorMessage);
        });

      MainSource.fetchRoomSimilarityByEmoji(query)
        .then((similarities) => {
          this.updateRoomSimilarityByEmoji(similarities);
        })
        .catch((errorMessage) => {
          this.fetchSimilaritiesFailed(errorMessage);
        });
    }
  }

  fetchMessagesOverTime(args = {
    startDate: moment().subtract(12, 'months').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD')
  }) {
    return (dispatch) => {
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
        return new Promise((resolve) => resolve(MainSource.fetchTotalMessages({
          starttime: times.startDate,
          endtime: times.endDate
        })));
      });

      let labels = dates.map(date => {
        return date.realDate.format('MMMM')
      })

      Promise.all(requests).then((messages) => {
        this.updateMessagesOverTime({ messages: messages, times: labels });
      }).catch((errorMessage) => {
        console.error(errorMessage);
        this.messagesOverTimeFailed(errorMessage);
      });
    }
  }

  updateMessagesOverTime(messages) {
    return messages;
  }

  messagesOverTimeFailed(errorMessage) {
    return errorMessage;
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
        console.error(errorMessage);
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
        console.error(errorMessage);
        this.trendingEmojisOverTimeFailed(errorMessage);
      });
    }
  }

  updateTrendingEmojisOverTime(emojisOverTime) {
    return emojisOverTime;
  }

  fetchActiveEmojisByUser(query) {
    return (dispatch) => {
      dispatch();

      MainSource.fetchActiveEmojisByUser(query)
        .then((topics) => {
          this.updateActiveEmojisByUser(topics);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
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

  fetchActiveMessagesByUser(query) {
    return (dispatch) => {
      dispatch();

      MainSource.fetchActiveMessagesByUser(query)
        .then((topics) => {
          this.updateActiveMessagesByUser(topics);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
          this.activeMessagesByUserFailed(errorMessage);
        });
    }
  }

  updateActiveMessagesByUser(activeMessagesUser) {
    return activeMessagesUser;
  }

  activeMessagesByUserFailed(errorMessage) {
    return errorMessage;
  }

  fetchActiveMessagesByRoom(query) {
    return (dispatch) => {
      dispatch();

      MainSource.fetchActiveMessagesByRoom(query)
        .then((topics) => {
          this.updateActiveMessagesByRoom(topics);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
          this.activeMessagesByRoomFailed(errorMessage);
        });
    }
  }

  updateActiveMessagesByRoom(activeMessagesRoom) {
    return activeMessagesRoom;
  }

  activeMessagesByRoomFailed(errorMessage) {
    return errorMessage;
  }

  fetchTotalMessages(query) {
    return (dispatch) => {
      dispatch();

      MainSource.fetchTotalMessages(query)
        .then((total) => {
          this.updateTotalMessages(total);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
          this.totalMessagesFailed(errorMessage);
        });

      MainSource.fetchTotalMessages(_.merge(query, { bot: false }))
        .then((total) => {
          this.updateTotalHumanMessages(total);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
          this.totalMessagesFailed(errorMessage);
        });
    }
  }

  updateTotalHumanMessages(total) {
    return total;
  }

  updateTotalMessages(total) {
    return total;
  }

  totalMessagesFailed(errorMessage) {
    return errorMessage;
  }

  fetchActiveEmojisByRoom(query) {
    return (dispatch) => {
      dispatch();

      MainSource.fetchActiveEmojisByRoom(query)
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

  fetchUsers() {
    return (dispatch) => {
      dispatch();
      MainSource.fetchUsers()
        .then((users) => {
          this.updateUsers(users);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
          this.usersFailed(errorMessage);
        });
    };
  }

  updateUsers(users) {
    return users;
  }

  usersFailed(errorMessage) {
    return errorMessage;
  }

  fetchRooms() {
    return (dispatch) => {
      dispatch();
      MainSource.fetchRooms()
        .then((rooms) => {
          this.updateRooms(rooms);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
          this.roomsFailed(errorMessage);
        });
    };
  }

  updateRooms(rooms) {
    return rooms;
  }

  roomsFailed(errorMessage) {
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
          console.error(errorMessage);
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
          console.error(errorMessage);
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
