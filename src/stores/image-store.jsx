const Reflux = require('reflux');
const _ = require('lodash');

let Actions = require('../actions');
let Api = require('../utils/api');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getImages: function(topicId) {
    return Api.get('topics/' + topicId).then(
      function(json) {
        this.images = _.reject(json.data, function(image) {
          // filtering out is_album going through each image
          return image.is_album;
        });
        this.triggerChange();
      }.bind(this)
    );
  },

  getImage: function(id) {
    return Api.get('gallery/image/' + id).then(
      function(json) {
        if (this.images) {
          this.images.push(json.data);
        } else {
          this.images = [json.data];
        }
        this.triggerChange();
      }.bind(this)
    );
  },
  find: function(id) {
    var image = _.find(this.images, { id: id });

    if (image) {
      return image;
    } else {
      this.getImage(id);
      return null;
    }
  },
  triggerChange: function() {
    this.trigger('change', this.images); //after req is finished,this triggers an event 'change' with new list of images
  },
});
