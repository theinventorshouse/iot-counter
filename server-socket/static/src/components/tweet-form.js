var React = require('react');
var socket = require('../socket');

var TweetForm = React.createClass({
	submitHandler: function submitHandler (event) {
		event.preventDefault();
		var inputValue = React.findDOMNode(this.refs.tweet).value;
		var tweetId = inputValue.match(/([0-9]{18})/g);
		if (!tweetId) {
			this.setState({message: 'algo salio mal :('});
			return;
		};
		event.target.reset();
		this.setState({message: 'enviado :)'});
		socket.emit('tweet', tweetId[0]);
	},
	getInitialState: function initialState () {
		return {
			message: ''
		};
	},
	render: function() {
		return (
				<div className="row">
					<form className="form-inline" onSubmit={this.submitHandler}>
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon">URL o id del twit </span>
								<input type="text" className="form-control" id="tweet" ref="tweet" placeholder="twitter.com/user/status/266031293945503744" />
							</div>
							<span className="label label-info">{this.state.message}</span>
						</div>
					</form>
				</div>
		);
	}

});

module.exports = TweetForm;