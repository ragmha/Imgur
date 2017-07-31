// Point of contact with Imgur API
const Fetch = require('whatwg-fetch');
const rootUrl = 'https://api.imgur.com/3/';
const apiKey = '22920d855c46f77'; // Enter your api key

module.exports = {
  get: url => {
    return fetch(rootUrl + url, {
      headers: {
        Authorization: 'Client-ID ' + apiKey,
      },
    }).then(function(response) {
      return response.json();
    });
  },
};
