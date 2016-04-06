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

        var days = _.groupBy(lessons, 'weekday')
        var cells = _.times(6, i => <Cell key={i} lessons={days[i + 1]} />)
        
        return (
            <tr>
                <Time value={time} />
                {cells}
            </tr>
        )
    }
});

module.exports = ScheduleTableRow;