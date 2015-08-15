var React = require('react')
var moment = require('moment')
var _ = require('lodash')

moment.locale('es')

var TweetHistory = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired
  },

  render () {
    var data = this.props.data
    var list = _.slice(data, 0, 10).map(function (item, key) {
      return <li key={key} className={item.action}>
				Una persona {item.action === 'in' ? 'entro' : 'salio'} hace {moment(item.created).fromNow()}
			</li>
    })
    return (
      <ul className='history'>
        {list}
      </ul>
    )
  }

})

module.exports = TweetHistory
