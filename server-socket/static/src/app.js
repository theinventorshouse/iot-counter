const React = require('react')
var Reflux = require('reflux')
var _ = require('lodash')
// var socket = require('./socket')

var PeopleStore = require('./stores/people')
var PeopleAction = require('./actions/people')

// Import components
var ActivityGraph = require('./components/activity-graph')
var PeopleHistory = require('./components/people-history')

var App = React.createClass({

  mixins: [Reflux.connect(PeopleStore, 'history')],

  componentDidMount () {
    PeopleAction.getHistory()

  },

  render () {
    if (this.state.history.length) {
      var actions = _.groupBy(this.state.history, 'action')
      var people = actions.in.length - actions.out.length
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='page-header'>
            <h1>IoT Counter <small>The realtime people counter.</small></h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            <div className='onSite'>Actual mente hay {people ? people : 0} persona dentro</div>
            <PeopleHistory data={this.state.history} />
          </div>
          <div className='col-md-4 text-center'>
            <h4>Actividad en la ultima hora</h4>
            <ActivityGraph data={this.state.history} />
          </div>
        </div>
      </div>
    )
  }
})

React.render(<App />, document.body)
