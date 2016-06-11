import ApiConstants from './ApiConstants.js'
import request from 'superagent';

const requestTimeoutMs = 5000;

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

export default {

  fetchTrendingTopics(query = { n: 15, starttime: '2016-01-01', endtime: '2016-12-12' }) {
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

  fetchTrendingEmojis(query = { n: 15, starttime: '2016-01-01', endtime: '2016-12-12' }) {
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

  fetchSimilarities(query = {
    starttime: '2016-01-01',
    endtime: '2016-12-12',
    firstDim: 'room',
    secondDim: 'entity'
  }) {
    return new Promise((resolve, reject) => {
      request.get(ApiConstants.resources.similarities)
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

  fetchAllEmojis(query = {
    starttime: '2016-01-01',
    endtime: '2016-12-12',
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
    starttime: '2016-01-01',
    endtime: '2016-12-12',
    dimension: 'user',
    method: 'totv',
    n: '32',
  }) {
    return fetchActiveEmojis(query);
  },

  fetchActiveEmojisByRoom(query = {
    starttime: '2016-01-01',
    endtime: '2016-12-12',
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
