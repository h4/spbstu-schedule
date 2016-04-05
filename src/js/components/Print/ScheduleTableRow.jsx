var React = require('react');
var _ = require('lodash');
var Cell = require('./Cell.jsx');

var Time = React.createClass({
    render: function() {
        return <td className='time_td'>{this.props.value}</td>;
    }
})

var ScheduleTableRow = React.createClass({
    render: function () {
        let lessons = this.props.lessons;
        let time = this.props.time;

        var days = _.fill([], null, 0, 5)
        _.forEach(lessons, l => days[l.weekday - 1] = l)
        var cells = _.times(6, i => <Cell key={i} lesson={days[i]} />)
        
        return (
            <tr>
                <Time value={time} />
                {cells}
            </tr>
        )
    }
});

module.exports = ScheduleTableRow;