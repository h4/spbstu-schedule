var React = require('react');
var _ = require('lodash');
var dateUtils = require('../utils/date');
var reactRedux = require('react-redux');
var Link = require('react-router').Link;
var actions = require('../actions/FacultyActions');
var Day = require('./Schedule/Day.jsx');
var Week = require('./Schedule/Week.jsx');

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
                <div className="schedule-page">
                    {faculty.name && <h2 className="page__h2">{faculty.name}</h2>}
                    {group.name && <h3 className="page__h3">Группа № {group.name}</h3>}
                    <div>Loading...</div>
                </div>
            )
        }

        if (!faculty || !group) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        return (
            <div className="schedule-page">
                <h2 className="page__h2">{faculty.name}</h2>
                <h3 className="page__h3">Группа № {group.name}</h3>

                <Week week={week} />

                <div className="switcher">
                    <div className="switcher__item">{nextDate && <Link to={`/faculty/${facultyId}/groups/${groupId}?date=${prevDate}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Предыдущая неделя</Link>}</div>
                    <div className="switcher__item">{nextDate && <Link to={`/faculty/${facultyId}/groups/${groupId}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Текущая неделя</Link>}</div>
                    <div className="switcher__item">{nextDate && <Link to={`/faculty/${facultyId}/groups/${groupId}?date=${nextDate}` }
                                                                     className="switcher__link"
                                                                     activeClassName="switcher__link_active">Следующая неделя</Link>}</div>
                </div>
                {
                lessons &&
                <ul className="schedule">
                    {lessons.map((day, i) =>
                        <Day key={i} date={day.date} lessons={day.lessons} />
                    )}
                </ul>
                }
                <div className="switcher">
                    <div className="switcher__item">{nextDate && <Link to={`/faculty/${facultyId}/groups/${groupId}?date=${prevDate}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Предыдущая неделя</Link>}</div>
                    <div className="switcher__item">{nextDate && <Link to={`/faculty/${facultyId}/groups/${groupId}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Текущая неделя</Link>}</div>
                    <div className="switcher__item">{nextDate && <Link to={`/faculty/${facultyId}/groups/${groupId}?date=${nextDate}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Следующая неделя</Link>}</div>
                </div>
            </div>
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
