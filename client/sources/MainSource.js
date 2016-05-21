import ApiConstants from './ApiConstants.js'
import request from 'superagent';

const requestTimeoutMs = 5000;

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
            console.log(res.text);
            resolve(JSON.parse(res.text));
          }
        });
    });
  },
  
  fetchSimilarities(query = { starttime: '2016-01-01', 
                              endtime: '2016-12-12',
                              firstDim: 'room',
                              secondDim: 'entity' }) {
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
  
  subscribeEvents(callback, args = {}) {
    let eventSocket = new WebSocket(`ws://localhost:3001/${ApiConstants.resources.events}`)
    eventSocket.onmessage = (event) => {
      callback(JSON.parse(event.data));
    };
  }
};
