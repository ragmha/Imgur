const React = require('react');
const Reflux = require('reflux');
const TopicStore = require('../stores/topic-store');
const Actions = require('../actions');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

module.exports = React.createClass({
  mixins: [Reflux.listenTo(TopicStore, 'onChange')],
  getInitialState: function() {
    return {
      topics: [],
    };
  },
  componentWillMount: function() {
    Actions.getTopics();
  },
  render: function() {
    return (
      <div className="list-group">
        {this.renderTopics()}
      </div>
    );
  },
  renderTopics: function() {
    return this.state.topics.slice(0, 4).map(function(topic) {
      return (
        <Link
          to={'topics/' + topic.id}
          className="list-group-item"
          key={topic.id}
        >
          <h4>
            {topic.name}
          </h4>
          <p>
            {topic.description}
          </p>
        </Link>
      );
    });
  },
  onChange: function(event, topics) {
    this.setState({ topics: topics });
  },
});
