var React = require('react');
var ReactDOM = require('react-dom')
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../../actions/FacultyActions');
var LessonsTablePdf = require('../Print/LessonsTablePdf.jsx');
var du = require('../../utils/date')

var ScheduleGroupTable = React.createClass({
    componentWillMount: function () {
        if (this.props.data) return;
        var groupId = this.props.params.groupId;
        
        var w = this.weeks()
        this.props.dispatch(actions.fetchWeeks(groupId, [du.qString(w.current), du.qString(w.next)]));
    },

    weeks: function() {
        var location = this.props.location;
        var currentWeekString = location.query && location.query.date;
        var currentWeek = du.getWeek(currentWeekString)
        var nextWeek = currentWeek.clone().add(1, 'weeks')

        return {current: currentWeek, next: nextWeek}
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
        var dateString = du.dString(date)

        var week = _.get(this.props, ['data', groupId, 'weeks', dateString, 'week']);
        var lessons = this.lessonsByDate(groupId, dateString)
        
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
        var w = this.weeks()

        var data1 = this.extract(w.current)
        var data2 = this.extract(w.next)
        
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
                <h3 className="page__h3">{data.faculty.abbr} Группа № {data.group.name} расписание с {du.humanDate(w.current)} по {du.humanDate(w.next.add(6, 'days'))}</h3>
                <LessonsTablePdf ref='table' lessons={data.weeks}  />
            </div>
        )
    },

    componentDidUpdate: function() {
        var node = ReactDOM.findDOMNode(this.refs.table)

        var limit = 1000

        if(node.offsetHeight > limit * 1.25) {
            node.className += ' scale_to_fit_big'
        } else if(node.offsetHeight > limit) {
            node.className += ' scale_to_fit_small'
        }

        if(!this.props.isFetching) {
            //mark page as ready for rendering, readed by phantomjs pdf.js script
            window.readyForPdfRendering = true
        }
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

