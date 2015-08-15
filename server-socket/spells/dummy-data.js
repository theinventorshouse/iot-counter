var WebSocketClient = require('websocket').client
// var mongoose = require('mongoose')
// var PeopleAction = require('../lib/action-model')

// mongoose.connect('mongodb://localhost/myappdatabase')
var client = new WebSocketClient()

client.on('connectFailed', function (error) {
  console.log('Connect Error: ' + error.toString())
})

client.on('connect', function (connection) {
  console.log('Conection')
  for (var i = 0; i < 20; i++) {
    (function (i) {
      setTimeout(function () {
        var newAction = ['in', 'out'][Math.floor(Math.random() * 2)]
        console.log('Send data to server', newAction)
        connection.sendUTF(newAction)
      }, Math.floor(Math.random() * 100000))
    })(i)
  }
})

client.connect('ws://localhost:3000/', 'arduino')
