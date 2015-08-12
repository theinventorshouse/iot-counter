var React = require('react');
var TweetHistory = require('./tweet-history');
// var data = {
//   tweet: tweet.text,
//   user: tweet.user.name,
//   avatar: tweet.user.profile_image_url,
//   retweets: tweet.retweet_count
// };
var InfoPanel = React.createClass({

	render: function() {
		var Tweets = this.props.tweets.map(function map (tweet, key) {
			return <TweetHistory tweetInfo={tweet}  key={key} onSelectItem={this.props.onSelectItem}/>;
		}.bind(this));
		return (
			<div className="row">
				<div className="col-md-12">
					{Tweets}
				</div>
			</div>
		);
	}

});



module.exports = InfoPanel;

