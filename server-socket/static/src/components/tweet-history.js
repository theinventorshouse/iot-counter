var React = require('react');
var Moment = require('moment');
var TweetHistory = React.createClass({

	clickHandler: function clickHandler (event) {
		event.preventDefault();
		var id = this.props.tweetInfo.id;
		this.props.onSelectItem(id);
	},

	render: function() {
		var tweetInfo = this.props.tweetInfo;
		return (
			<a href="#" onClick={this.clickHandler}>
			<div className="panel panel-default">
				<div className="panel-body">
					<h4><img src={tweetInfo.avatar} className="img-thumbnail"/> {tweetInfo.user} <small>{Moment(tweetInfo.date).fromNow()}</small></h4>
					<p>{tweetInfo.tweet}</p>
				</div>
			</div>
			</a>
		);
	}

});

module.exports = TweetHistory;