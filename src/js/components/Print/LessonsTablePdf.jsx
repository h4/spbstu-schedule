var React = require('react');
var ScheduleTableRow = require('./ScheduleTableRow.jsx');
var _ = require('lodash');

var LessonsTablePdf = React.createClass({
    render: function () {
        let lessons = this.props.lessons;

        if (! lessons || lessons.length === 0) {
            <h3>Нет занятий</h3>
        }

        return (
            <table className="schedule-printable">
            <thead>
                <tr>
                    <th className="time_th">время</th>
                    <th>понедельник</th>
                    <th>вторник</th>
                    <th>среда</th>
                    <th>четверг</th>
                    <th>пятница</th>
                    <th>суббота</th>
                </tr>
            </thead>
            <tbody>
                {_.map(lessons, (row) => <ScheduleTableRow time={row[0].time_start} key={row[0].time_start} lessons={row} />)}
            </tbody>
            </table>
        )
    }
});

module.exports = LessonsTablePdf;
