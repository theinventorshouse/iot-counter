var Reflux = require('reflux')
var request = require('superagent')
var Socket = require('../socket')

// Import Actions
var PeopleActions = require('../actions/people')

Socket.on('newAction', function (action) {
  PeopleActions.peopleAction(action)
})

module.exports = Reflux.createStore({
  init () {
    this.listenToMany(PeopleActions)
    this.data = []
  },

  getInitialState () {
    return []
  },

  updateData () {
    this.trigger(this.data)
  },

  onGetHistory () {
    request.get('/activity').end((error, response) => {
      if (error) {
        console.error('Error on request get /activity', error)
      }
      console.info('Response GET /activity', response.body)
      this.data = response.body
      this.updateData()
    })
  },

  onPeopleAction (action) {
    this.data.unshift(action)
    this.updateData()
  }
})
