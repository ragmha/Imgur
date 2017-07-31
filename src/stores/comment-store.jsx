const Reflux = require('reflux');
let Actions = require('../actions');
let Api = require('../utils/api');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getImage: function(id) {
    return Api.get('gallery/' + id + '/comments').then(
      function(json) {
        this.comments = json.data;
        this.triggerChange();
      }.bind(this)
    );
  },
  triggerChange: function() {
    this.trigger('change', this.comments);
  },
});
