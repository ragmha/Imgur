const React = require('react');
const Actions = require('../actions');
const ImageStore = require('../stores/image-store');
const Reflux = require('reflux');
const ImagePreview = require('./image-preview');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange'), // listens to event and runs onChange
  ],
  getInitialState: function() {
    return {
      images: [],
    };
  },
  componentWillMount: function() {
    Actions.getImages(this.props.params.id);
  },
  componentWillReceiveProps: function(nextProps) {
    Actions.getImages(nextProps.params.id);
  },
  render: function() {
    return (
      <div className="topic">
        {this.renderImages()}
      </div>
    );
  },
  renderImages: function() {
    return this.state.images.slice(0, 20).map(function(image) {
      return <ImagePreview key={image.id} {...image} />;
    });
  },
  onChange: function(event, images) {
    this.setState({ images: images });
  },
});
