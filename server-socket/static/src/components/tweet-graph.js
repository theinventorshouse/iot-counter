var React = require('react');
var socket = require('../socket');
var d3print = require("../graph");

var TweetGraph = React.createClass({

	componentDidMount: function didMount () {
		socket.on('graphData', function graphData (data) {
			d3print(data.graph);
		});
	},

	render: function() {
		return <div id="graph"></div>;
	}

});

module.exports = TweetGraph;