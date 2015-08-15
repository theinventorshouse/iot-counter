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
        <a href='https://github.com/theinventorshouse/iot-counter'>
          <img style={{position: 'absolute', top: 0, right: 0, border: 0}} src='https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67' alt='Fork me on GitHub' data-canonical-src='https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png'/>
          </a>
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

          <div className='row'>
            <div className='footer text-center'>
              <p>Este proyecto fue construido por Andres Shabas [<a href='https://github.com/sabas1080'>@sabas1080</a>] e Iddar Olivares [<a href='https://github.com/idda'>@iddar</a>]</p>
            </div>
          </div>
      </div>
    )
  }
})

React.render(<App />, document.body)
