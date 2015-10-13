var React = require('react');
var _ = require('lodash');
var dateUtils = require('../utils/date');
var reactRedux = require('react-redux');
var Link = require('react-router').Link;
var actions = require('../actions/FacultyActions');
var Day = require('./Schedule/Day.jsx');

var Schedule = React.createClass({
    componentWillMount: function () {
        var facultyId = this.props.params.facultyId;
        var groupId = this.props.params.groupId;

        if (!this.props.faculties) {
            this.props.dispatch(actions.fetchFaculties());
        }

        if (!this.props.groups) {
            this.props.dispatch(actions.fetchGroups(facultyId));
        }

        this.date = this.props.query && this.props.query.date;

        this.props.dispatch(actions.fetchLessons(facultyId, groupId, this.date));
    },

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

    render: function() {
        var groupId = parseInt(this.props.params.groupId, 10);
        var facultyId = parseInt(this.props.params.facultyId, 10);
        var faculty = _.find(this.props.faculties, 'id', facultyId);
        var groups = this.props.groups || {};
        var group = _.find(groups[facultyId], 'id', groupId);
        var lessons = this.props.lessons && this.props.lessons[groupId];
        var week = this.props.week;
        var nextDate = week && dateUtils.getNextWeekStartString(week);
        var prevDate = week && dateUtils.getPrevWeekStartString(week);

        if (this.props.isFetching && faculty && group) {
            return (
                <div>
                    {faculty.name && <h2>{faculty.name}</h2>}
                    {group.name && <h3>{group.name}</h3>}
                    <div>Loading...</div>
                </div>
            )
        }

        if (!faculty || !group) {
            return (
                <div>
                    <div>Loading...</div>
                </div>
            )
        }

        return (
            <div>
                <h2>{faculty.name}</h2>
                <h3>{group.name}</h3>
                <p>{nextDate && <Link to={`/faculty/${facultyId}/groups/${groupId}?date=${prevDate}` }>Предыдущая неделя</Link>}</p>
                <p>{nextDate && <Link to={`/faculty/${facultyId}/groups/${groupId}` }>Текущая неделя</Link>}</p>
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
