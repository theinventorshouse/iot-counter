var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
var RawSocket = require('./lib/raw-socket')
var PeopleAction = require('./lib/action-model')

mongoose.connect('mongodb://localhost/myappdatabase')
RawSocket(3000, onCounterChange)

function onCounterChange (newAction) {
  console.log('Action: ', newAction)
  var newPeopleAction = new PeopleAction({
    action: newAction
  })
  newPeopleAction.save(function (error) {
    if (error) {
      console.log('\n\nError on save people action: ', error)
      return
    }
    console.log((new Date()) + 'Action saved successfully!')
  })
}

var PORT = process.env.PORT || 8000

var pub = __dirname + '/static'
app.use(express.static(pub))

io.on('connection', function (socket) {
  console.log('Socket.io Ok')
  socket.on('tweet', function (tweetId) {
  })
})

http.listen(PORT, function serverOn () {
  console.log('http://localhost:' + PORT)
})
