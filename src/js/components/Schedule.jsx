var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var Link = require('react-router').Link;
var actions = require('../actions/FacultyActions');
var Day = require('./Schedule/Day.jsx');

var Schedule = React.createClass({
    componentDidMount: function() {
        var facultyId = this.props.params.facultyId;
        var groupId = this.props.params.groupId;

        this.date = this.props.query && this.props.query.date;

        this.props.dispatch(actions.fetchLessons(facultyId, groupId, this.date));
    },

    componentDidUpdate: function() {
        var facultyId = this.props.params.facultyId;
        var groupId = this.props.params.groupId;
        var date = this.props.query && this.props.query.date;

        if (this.date !== date) {
            this.date = date;
            this.props.dispatch(actions.fetchLessons(facultyId, groupId, date));
        }
    },

    getNextDate: function(week) {
        if (! week) {
            return;
        }

        return week.date_end.split('.').map(function (el, idx) {
            if (idx === 2) {
                return parseInt(el, 10) + 1;
            } else {
                return el;
            }
        }).join('-');
    },

    render: function() {
        var groupId = parseInt(this.props.params.groupId, 10);
        var facultyId = parseInt(this.props.params.facultyId, 10);
        var faculty = _.find(this.props.faculties, 'id', facultyId);
        var group = _.find(this.props.groups[facultyId], 'id', groupId);
        var lessons = this.props.lessons && this.props.lessons[groupId];
        var week = this.props.week;
        var nextDate = this.getNextDate(week);

        if (this.props.isFetching) {
            return (
                <div>
                    {faculty.name && <h2>{faculty.name}</h2>}
                    {group.name && <h3>{group.name}</h3>}
                    <div>Loading...</div>
                </div>
            )
        }

        return (
            <div>
                <h2>{faculty.name}</h2>
                <h3>{group.name}</h3>
                <p>{nextDate && <Link to={`/faculty/${facultyId}/groups/${groupId}?date=${nextDate}` }>Следующая неделя</Link>}</p>
                {
                lessons &&
                <ul>
                    {lessons.map((day, i) =>
                        <Day key={i} date={day.date} lessons={day.lessons} />
                    )}
                </ul>
            }</div>
        )
    }
});

Schedule.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.lessons.isFetching,
        groups: state.groups.data,
        faculties: state.faculties.data,
        lessons: state.lessons.data,
        week: state.lessons.week
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Schedule);
