var React = require('react');
var ScheduleTableRow = require('./ScheduleTableRow.jsx');

var LessonsTablePdf = React.createClass({
    render: function () {
        let lessons = this.props.lessons;

        if (! lessons || lessons.length === 0) {
            <h3>Нет занятий</h3>
        }

        return (
            <table className="schedule-printable">
            <thead>
                <th>&nbsp;</th>
                <th>Пн</th>
                <th>Вт</th>
                <th>Ср</th>
                <th>Чт</th>
                <th>Пт</th>
                <th>Сб</th>
            </thead>
            <tbody>
                {lessons.map(row => <ScheduleTableRow key={row.startTime} lessons={row} />)}
            </tbody>
            </table>
        )
    }
});

module.exports = LessonsTablePdf;
