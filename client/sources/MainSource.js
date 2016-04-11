import request from 'superagent';
//http -f POST localhost:3001/api/web/trending\?maxResults\=200 starttime=2016-01-01 endtime=2016-12-12
export default {
  
  fetchTrendingTopics(args = {}) {
    return new Promise((resolve, reject) => {
       request
          .post('/api/web/trending?maxResults=100')
          .type('form')
          .send({ starttime: '2016-01-01', endtime: '2016-12-12' })
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