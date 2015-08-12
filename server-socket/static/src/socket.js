var socket = require('socket.io-client')(window.location.origin);

socket.on('connect', function(){
	console.log("Socket.io Ok");
});

module.exports = socket;