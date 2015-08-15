var React = require('react')
var c3 = require('c3')
var moment = require('moment')
var _ = require('lodash')
// var socket = require('../socket')
// var d3print = require('../graph')

var ActivityGraph = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired
  },

  drawGraph (data) {
    var hours = _.filter(data, function (item) {
      return moment().isSame(item.created, 'hour')
    })
    var actions = _.isEmpty(hours) ? _.groupBy(data, 'action') : _.groupBy(hours, 'action')
    // var groupHours = _.groupBy(data, function (item) {
    //   return moment(item.created).hours()
    // })
    c3.generate({
      bindto: '#activity-graph',
      data: {
        columns: [
          ['Entraron', actions.in.length],
          ['Salieron', actions.out.length]
        ],
        type: 'bar'
      }
    })
  },

  render () {
    var data = this.props.data
    if (data.length) this.drawGraph(data)
    return <div id='activity-graph'></div>
  }
})

module.exports = ActivityGraph
