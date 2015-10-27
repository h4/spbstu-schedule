var React = require('react');
var _ = require('lodash');
var dateUtils = require('../utils/date');
var reactRedux = require('react-redux');
var Link = require('react-router').Link;
var actions = require('../actions/TeacherActions');
var Day = require('./Schedule/Day.jsx');
var Week = require('./Schedule/Week.jsx');

var Teacher = React.createClass({
    componentWillMount: function () {
        var teacherId = this.props.params.teacherId;
        var location = this.props.location;
        this.date = location.query && location.query.date;

        this.props.dispatch(actions.fetchTeacher(teacherId, this.date));
    },

    componentWillUpdate: function() {
        var teacherId = this.props.params.teacherId;
        var location = this.props.location;
        var date = location.query && location.query.date;

        if (this.date !== date) {
            this.date = date;
            this.props.dispatch(actions.fetchTeacher(teacherId, this.date));
        }
    },

    render: function() {
        var teacherId = parseInt(this.props.params.teacherId, 10);
        var lessons = this.props.lessons && this.props.lessons[teacherId];
        var teacher = this.props.teacher;
        var week = this.props.week;
        var nextDate = week && dateUtils.getNextWeekStartString(week);
        var prevDate = week && dateUtils.getPrevWeekStartString(week);

        if (this.props.isFetching) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        if (! teacher) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        return (
            <div className="schedule-page">
                <h2 className="page__h2">{teacher.full_name}</h2>

                <Week week={week} />

                <div className="switcher">
                    <div className="switcher__item">{nextDate && <Link to={`/teachers/${teacherId}?date=${prevDate}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Предыдущая неделя</Link>}</div>
                    <div className="switcher__item">{nextDate && <Link to={`/teachers/${teacherId}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Текущая неделя</Link>}</div>
                    <div className="switcher__item">{nextDate && <Link to={`/teachers/${teacherId}?date=${nextDate}` }
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
                    <div className="switcher__item">{nextDate && <Link to={`/teachers/${teacherId}?date=${prevDate}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Предыдущая неделя</Link>}</div>
                    <div className="switcher__item">{nextDate && <Link to={`/teachers/${teacherId}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Текущая неделя</Link>}</div>
                    <div className="switcher__item">{nextDate && <Link to={`/teachers/${teacherId}?date=${nextDate}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Следующая неделя</Link>}</div>
                </div>
            </div>
        )
    }
});

Teacher.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.teachers.isFetching,
        teacher: state.teachers.teacher,
        lessons: state.teachers.data,
        week: state.teachers.week
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Teacher);
