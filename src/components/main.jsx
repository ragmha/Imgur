const React = require('react');
const Header = require('./header');
const TopicList = require('./topic-list');

// Main component
module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        {this.content()}
      </div>
    );
  },
  content: function() {
    if (this.props.children) {
      return this.props.children;
    } else {
      return <TopicList />;
    }
  },
});
