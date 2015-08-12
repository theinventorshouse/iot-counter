var React = require("react");
var TweetForm = require('./components/tweet-form');
var TweetGraph = require('./components/tweet-graph');
var TweetPanel = require('./components/tweet-panel');
var socket = require('./socket');


var App = React.createClass({

	componentDidMount: function didMount () {
		socket.on('history', function graphData (tweets) {
			this.setState({
				tweets: tweets
			});
		}.bind(this));
	},
	onSelectItem: function onSelectItem (id) {
		socket.emit('tweet', id);
	},
	getInitialState: function initialState () {
		return {
			tweets: []
		};
	},

	render: function() {
		return (
			<div className="container">
				<div className="row">					
					<div className="page-header">
						<h1>Re-tweet Graph <small>la propragración de un tweet en un solo grafo</small></h1>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8">
						<TweetForm />
						<TweetGraph />
					</div>
					<div className="col-md-4">
						<TweetPanel tweets={this.state.tweets} onSelectItem={this.onSelectItem}/>
					</div>
				</div>
			</div>
		);
	}
});

React.render(<App />, document.body);