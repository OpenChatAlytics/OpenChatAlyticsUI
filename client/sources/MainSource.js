import ApiConstants from './ApiConstants.js'
import request from 'superagent';
import moment from 'moment';

const requestTimeoutMs = 5000;

function getDefaultStartDate() {
  return moment(new Date()).subtract(1, 'y').format('YYYY-MM-DD');
}

function getDefaultEndDate() {
  return moment(new Date()).format('YYYY-MM-DD');
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
          console.trace(res);
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

  fetchTrendingTopics(query = {
    n: 15,
    starttime: getDefaultStartDate(),
    endtime: getDefaultEndDate()
  }) {
    return new Promise((resolve, reject) => {
      request
        .get(ApiConstants.resources.trendingEntities)
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
  },

  fetchTrendingEmojis(query = {
    n: 15,
    starttime: getDefaultStartDate(),
    endtime: getDefaultEndDate()
  }) {
    return new Promise((resolve, reject) => {
      request.get(ApiConstants.resources.trendingEmojis)
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
  },

  fetchUserSimilarityByEntity(query = {
    starttime: getDefaultStartDate(),
    endtime: getDefaultEndDate(),
  }) {
    return fetchEntitySimilarities({
      starttime: (query && query.starttime) ? query.starttime : getDefaultStartDate(),
      endtime: (query && query.endtime) ? query.endtime : getDefaultEndDate(),
      firstDim: 'user',
      secondDim: 'entity'
    });
  },

  fetchRoomSimilarityByEntity(query = {
    starttime: getDefaultStartDate(),
    endtime: getDefaultEndDate(),
  }) {
    return fetchEntitySimilarities({
      starttime: (query && query.starttime) ? query.starttime : getDefaultStartDate(),
      endtime: (query && query.endtime) ? query.endtime : getDefaultEndDate(),
      firstDim: 'room',
      secondDim: 'entity'
    });
  },

  fetchUserSimilarityByEmoji(query = {
    starttime: getDefaultStartDate(),
    endtime: getDefaultEndDate(),
  }) {
    return fetchEmojiSimilarities({
      starttime: (query && query.starttime) ? query.starttime : getDefaultStartDate(),
      endtime: (query && query.endtime) ? query.endtime : getDefaultEndDate(),
      firstDim: 'user',
      secondDim: 'emoji'
    });
  },

  fetchRoomSimilarityByEmoji(query = {
    starttime: getDefaultStartDate(),
    endtime: getDefaultEndDate(),
  }) {
    return fetchEmojiSimilarities({
      starttime: (query && query.starttime) ? query.starttime : getDefaultStartDate(),
      endtime: (query && query.endtime) ? query.endtime : getDefaultEndDate(),
      firstDim: 'room',
      secondDim: 'emoji'
    });
  },

  fetchAllEmojis(query = {
    starttime: getDefaultStartDate(),
    endtime: getDefaultEndDate(),
  }) {
    return new Promise((resolve, reject) => {
      request.get(ApiConstants.resources.allEmojis)
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
  },

  fetchActiveEmojisByUser(query = {
    starttime: getDefaultStartDate(),
    endtime: getDefaultEndDate(),
    dimension: 'user',
    method: 'totv',
    n: '32',
  }) {
    return fetchActiveEmojis(query);
  },

  fetchActiveEmojisByRoom(query = {
    starttime: getDefaultStartDate(),
    endtime: getDefaultEndDate(),
    dimension: 'room',
    method: 'totv',
    n: '32',
  }) {
    return fetchActiveEmojis(query);
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
