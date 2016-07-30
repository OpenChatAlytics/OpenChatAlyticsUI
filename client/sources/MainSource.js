import ApiConstants from './ApiConstants.js';
import request from 'superagent';
import moment from 'moment';
import _ from 'lodash';

function getDefaultStartDate() {
  return moment(new Date()).subtract(1, 'y').format('YYYY-MM-DD');
}

function getDefaultEndDate() {
  return moment(new Date()).format('YYYY-MM-DD');
}

function getDefaultTimeRange() {
  return {
    starttime: getDefaultStartDate(),
    endtime: getDefaultEndDate()
  }
}

function fetchActiveEmojis(query) {
  return new Promise((resolve, reject) => {
    request.get(ApiConstants.resources.activeEmojis)
      .query(query)
      .end((err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(res.text));
        }
      });
  });
}

function fetchActiveMessages(query) {
  return new Promise((resolve, reject) => {
    request.get(ApiConstants.resources.activeMessages)
      .query(query)
      .end((err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(res.text));
        }
      });
  });
}

function fetchEntitySimilarities(query) {
  return new Promise((resolve, reject) => {
    request.get(ApiConstants.resources.entitySimilarities)
      .query(query)
      .end((err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(res.text));
        }
      });
  });
}

function fetchEmojiSimilarities(query) {
  return new Promise((resolve, reject) => {
    request.get(ApiConstants.resources.emojiSimilarities)
      .query(query)
      .end((err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(res.text));
        }
      });
  });
}


export default {

  // defaultStartDate = getDefaultStartDate(),
  // defaultEndDate = getDefaultEndDate(),

  fetchTrendingTopics(query) {
    return new Promise((resolve, reject) => {
      request
        .get(ApiConstants.resources.trendingEntities)
        .query(_.merge({
          n: 15
        }, _.merge(getDefaultTimeRange(), query)))
        .end((err, res) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  fetchTrendingEmojis(query) {
    return new Promise((resolve, reject) => {
      request.get(ApiConstants.resources.trendingEmojis)
        .query(_.merge({
          n: 15
        }, _.merge(getDefaultTimeRange(), query)))
        .end((err, res) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  fetchUserSimilarityByEntity(query) {
    return fetchEntitySimilarities(_.merge({
      firstDim: 'user',
      secondDim: 'entity'
    }, _.merge(getDefaultTimeRange(), query)));
  },

  fetchRoomSimilarityByEntity(query) {
    return fetchEntitySimilarities(_.merge({
      firstDim: 'room',
      secondDim: 'entity'
    }, _.merge(getDefaultTimeRange(), query)));
  },

  fetchUserSimilarityByEmoji(query) {
    return fetchEmojiSimilarities(_.merge({
      firstDim: 'user',
      secondDim: 'emoji'
    }, _.merge(getDefaultTimeRange(), query)));
  },

  fetchRoomSimilarityByEmoji(query) {
    return fetchEmojiSimilarities(_.merge({
      firstDim: 'room',
      secondDim: 'emoji'
    }, _.merge(getDefaultTimeRange(), query)));
  },

  fetchAllEmojis(query) {
    return new Promise((resolve, reject) => {
      request.get(ApiConstants.resources.allEmojis)
        .query(_.merge(getDefaultTimeRange(), query))
        .end((err, res) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  fetchActiveEmojisByUser(query) {
    return fetchActiveEmojis(_.merge(_.merge({
      dimension: 'user',
      method: 'totv',
      n: '32'
    }, getDefaultTimeRange()), query));
  },

  fetchActiveEmojisByRoom(query) {
    return fetchActiveEmojis(_.merge(_.merge({
      dimension: 'room',
      method: 'totv',
      n: '32'
    }, getDefaultTimeRange()), query));
  },

  fetchEmojiIcons() {
    return new Promise((resolve, reject) => {
      request.get(ApiConstants.resources.emojiIcons)
        .end((err, res) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  fetchActiveMessagesByUser(query) {
    return fetchActiveMessages(_.merge(_.merge({
      dimension: 'user',
      method: 'totv',
      n: '32',
      bot: false,
    }, getDefaultTimeRange()), query));
  },

  fetchActiveMessagesByRoom(query) {
    return fetchActiveMessages(_.merge(_.merge({
      dimension: 'room',
      method: 'totv',
      n: '32',
      bot: false,
    }, getDefaultTimeRange()), query));
  },

  fetchTotalMessages(query) {
    return new Promise((resolve, reject) => {
      request.get(ApiConstants.resources.totalMessages)
        .query(_.merge(_.merge({ bot: true }, getDefaultTimeRange()), query))
        .end((err, res) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(res.text);
          }
        });
    });
  },

  fetchUserIcons() {
    return new Promise((resolve, reject) => {
      request.get(ApiConstants.resources.userIcons)
        .end((err, res) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  subscribeEvents(callback, args = {}) {
    let eventSocket = new WebSocket(`ws://localhost:3001/${ApiConstants.resources.events}`)
    eventSocket.onmessage = (event) => {
      callback(JSON.parse(event.data));
    };
  }
};