import ApiConstants from './ApiConstants.js'
import request from 'superagent';

//http -f POST localhost:3001/api/web/trending\?maxResults\=200 starttime=2016-01-01 endtime=2016-12-12

const requestTimeoutMs = 5000;

export default {

  fetchTrendingTopics(query = { n: 15, starttime: '2016-01-01', endtime: '2016-12-12' }) {
    return new Promise((resolve, reject) => {
       request
          .get(ApiConstants.resources.trending)
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
  },

  fetch: function () {
    // returning a Promise because that is what fetch does.
    return new Promise(function (resolve, reject) {
      // simulate an asynchronous action where data is fetched on
      // a remote server somewhere.
      setTimeout(function () {
        // resolve with some mock data
        resolve([
          { id: 0, name: 'Abu Dhabi' },
          { id: 1, name: 'Berlin' },
          { id: 2, name: 'Bogota' },
          { id: 3, name: 'Buenos Aires' },
          { id: 4, name: 'Cairo' },
          { id: 5, name: 'Chicago' },
          { id: 6, name: 'Lima' },
          { id: 7, name: 'London' },
          { id: 8, name: 'Miami' },
          { id: 9, name: 'Moscow' },
          { id: 10, name: 'Mumbai' },
          { id: 11, name: 'Paris' },
          { id: 12, name: 'San Francisco' }
        ]);
      }, 3000);
    });
  }
};
