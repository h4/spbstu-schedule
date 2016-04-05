var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../../actions/FacultyActions');
var LessonsTablePdf = require('../Print/LessonsTablePdf.jsx');

var SchedulePdf = React.createClass({
    componentWillMount: function () {
        var facultyId = this.props.params.facultyId;
        var groupId = this.props.params.groupId;


        this.date = this.props.query && this.props.query.date;

        if (! this.props.lessons || ! this.isCurrentGroup(groupId)) {
            this.props.dispatch(actions.fetchLessons(facultyId, groupId, this.date));
        }
    },

    isCurrentGroup(groupId) {
        if (this.props.group) {
            return (this.props.group.id === groupId);
        } else {
            return true;
        }
    },

    resortLessons: function(lessons) {
        return _.chain(lessons)
            .flatMap(day =>
                _.map(day.lessons, lesson => {lesson.weekday = day.weekday; return lesson} )
            )
            .orderBy(lesson => lesson.weekday)
            .groupBy(lesson => lesson.time_start)
            .sortBy(lesson => lesson[0].time_start)
            .value()

    },

    render: function() {
        var groupId = parseInt(this.props.params.groupId, 10);
        var facultyId = parseInt(this.props.params.facultyId, 10);
        var group = this.props.group;
        var faculty = group && group.faculty;
        var lessons = this.props.lessons && this.props.lessons[groupId];
        lessons = this.resortLessons(lessons)

        if (this.props.isFetching && faculty && group) {
            if (this.isCurrentGroup(groupId)) {
                return (
                    <div className="schedule-page">
                        {faculty.name && <h2 className="page__h2">{faculty.name}</h2>}
                        {group.name && <h3 className="page__h3">Группа № {group.name}</h3>}
                        <div>Данные загружаются...</div>
                    </div>
                )
            } else {
                return (
                    <div className="schedule-page">
                        {faculty.name && <h2 className="page__h2">{faculty.name}</h2>}
                        <div>Данные загружаются...</div>
                    </div>
                )
            }

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
                <h3 className="page__h3">{faculty.abbr} Группа № {group.name}</h3>
                <LessonsTablePdf lessons={lessons} />
            </div>
        )
    },

    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        isFetching: React.PropTypes.bool.isRequired
    }
});

function mapStateToProps(state) {
    return {
        isFetching: state.lessons.isFetching,
        group: state.lessons.group,
        lessons: state.lessons.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(SchedulePdf);
