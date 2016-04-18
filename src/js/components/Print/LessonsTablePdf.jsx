var React = require('react');
var getRows = require('./ScheduleTableRow.jsx');
var _ = require('lodash');

var LessonsTablePdf = React.createClass({
    render: function () {
        let even = this.props.lessons.even;
        let odd = this.props.lessons.odd;

        if ((!even || even.length === 0) && (!odd || odd.length === 0)) {
            <h3>Нет занятий</h3>
        }

        var hours = _.sortBy(_.union(_.map(even, x => x[0].commonTime), _.map(odd, x => x[0].commonTime)))
        even = _.mapKeys(even, e => e[0].commonTime)
        odd = _.mapKeys(odd, e => e[0].commonTime)

        var rows = _.map(hours, (hour) => {
            return getRows(even[hour], odd[hour], hour, this.props.showGroups)
        })
        rows = _.flatten(rows)
        return (
            <div>
                <table className="schedule-printable">
                <thead>
                    <tr>
                        <th className="time_th">время</th>
                        <th className="week_th">&nbsp;</th>
                        <th>понедельник</th>
                        <th>вторник</th>
                        <th>среда</th>
                        <th>четверг</th>
                        <th>пятница</th>
                        <th>суббота</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                </table>
            </div>
        )
    }
});

module.exports = LessonsTablePdf;
