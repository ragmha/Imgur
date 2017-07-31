const Reflux = require('reflux');

//Actions is just a proxy for methods

module.exports = Reflux.createActions([
  'getTopics',
  'getImages',
  'getImage'
]);
