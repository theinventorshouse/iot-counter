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
  var action = {
    action: newAction,
    created: new Date().toISOString()
  }
  io.emit('newAction', action)
  var newPeopleAction = new PeopleAction(action)
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

app.get('/activity', function (req, res) {
  PeopleAction.find({})
    .limit(100)
    .sort('-created')
    .select('action created')
    .exec(function (error, peopleActions) {
      if (error) {
        console.log('\n\nError on read people action: ', error)
      }
      res.json(peopleActions)
    })
})

io.on('connection', function (socket) {
  console.log('Socket.io Ok')
})

http.listen(PORT, function serverOn () {
  console.log('http://localhost:' + PORT)
})
