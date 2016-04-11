var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../../actions/FacultyActions');
var LessonsTablePdf = require('../Print/LessonsTablePdf.jsx');
var dateUtils = require('../../utils/date')

var SchedulePdf = React.createClass({
    componentWillMount: function () {
        var groupId = this.props.params.groupId;

        if (!this.props.data) {
            this.props.dispatch(actions.fetchWeeks(groupId, ['2016-4-4', '2016-4-11']));
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


    extract: function(date) {
        var groupId = parseInt(this.props.params.groupId, 10);
        var group = _.get(this.props.data, [groupId, 'group']);
        var faculty = group && group.faculty;

        var week = _.get(this.props, ['data', groupId, 'weeks', date, 'week']);
        var lessons = this.lessonsByDate(groupId, date)
        
        if(faculty && group && lessons && week) {
            return {
                faculty,
                group,
                weeks: {
                    [week.is_odd ? 'odd' : 'even']: lessons
                }
            }
        } else {
            return null
        }
    },

    lessonsByDate: function(groupId, date) {
        var lessons = _.get(this.props, ['data', groupId, 'weeks', date, 'days'])
        lessons = this.resortLessons(lessons)
        return lessons
    },

    render: function() {
        var data1 = this.extract('2016.04.04')
        var data2 = this.extract('2016.04.11')
        
        var data = _.merge(data1, data2)

        if (!data.weeks) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        return (
            <div className="schedule-page">
                <h3 className="page__h3">{data.faculty.abbr} Группа № {data.group.name}</h3>
                <LessonsTablePdf lessons={data.weeks}  />
            </div>
        )
    },

    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        data: React.PropTypes.object
    }
});

function mapStateToProps(state) {
    return {
        isFetching: state.weeks.isFetching,
        data: state.weeks.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(SchedulePdf);
