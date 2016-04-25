var React = require('react');
var ReactDOM = require('react-dom')
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../../actions/FacultyActions');
var LessonsTablePdf = require('../Print/LessonsTablePdf.jsx');
var du = require('../../utils/date')

var ScheduleGridView = React.createClass({
    componentWillMount: function () {
        if (this.props.data) return;
        if (this.props.groupId) {
            this.props.dispatch(actions.fetchGroupWeeks(this.props.groupId, [du.qString(this.props.currentWeek), du.qString(this.props.nextWeek)]));
        } else if (this.props.teacherId) {
            this.props.dispatch(actions.fetchTeacherWeeks(this.props.teacherId, [du.qString(this.props.currentWeek), du.qString(this.props.nextWeek)]));
        }
    },

    /*
    Все лекции группируются по стандартной временной сетке 8-00 10-00 ... 20-00
    если лекция начинается в нестадартное время, то она перемещается по сетке в ближайшую более позднюю стандартную ячейку и
    помечается текстом "идёт с хх по уу"
    Странно, но таково требование свыше
    */
    commonTimeStart: function(lesson) {
        lesson.commonTime = du.nearestCommonTime(lesson.time_start)
        return lesson.commonTime
    },

    resortLessons: function(lessons) {
        return _.chain(lessons)
            .flatMap(day =>
                _.map(day.lessons, lesson => {lesson.weekday = day.weekday; return lesson} )
            )
            .orderBy(lesson => lesson.weekday)
            .groupBy(this.commonTimeStart)
            .sortBy(lesson => lesson[0].commonTime)
            .value()
    },

    extractByGroup: function(date) {
        var group = _.get(this.props.data, ['groups', this.props.groupId, 'group']);
        var faculty = group && group.faculty;
        var dateString = du.dString(date)

        var week = this.week(dateString)
        var lessons = this.lessonsByDate(dateString)
        
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

    extractByTeacher: function(date) {
        var teacher = _.get(this.props.data, ['teachers', this.props.teacherId, 'teacher']);
        var dateString = du.dString(date)

        var week = this.week(dateString)
        var lessons = this.lessonsByDate(dateString)
        
        if(teacher && lessons && week) {
            return {
                teacher,
                weeks: {
                    [week.is_odd ? 'odd' : 'even']: lessons
                }
            }
        } else {
            return null
        }
    },

    lessonsByDate: function(date) {
        var lessons
        if (this.props.groupId) {
            lessons = _.get(this.props, ['data', 'groups', this.props.groupId, 'weeks', date, 'days'])
        } else if(this.props.teacherId) {
            lessons = _.get(this.props, ['data', 'teachers', this.props.teacherId, 'weeks', date, 'days'])
        }
        lessons = this.resortLessons(lessons)
        return lessons
    },

    from: function() {
        var cw = this.props.currentWeek
        var dateString = du.dString(cw)
        var week = this.week(dateString)
        var result = du.humanDate(cw)
        if(week) {
            result += ' ' + (week.is_odd ? '(нечётная неделя)' : '(чётная неделя)')
        }
        return result
    },
    to: function() {
        var nw = this.props.nextWeek
        
        var dateString = du.dString(nw)
        var week = this.week(dateString)
        var result = du.humanDate(nw.clone().add(6, 'days'))
        if(week) {
            result += ' ' + (week.is_odd ? '(нечётная неделя)' : '(чётная неделя)')
        }
        return result

    },
    
    week: function(dateString) {
        if (this.props.groupId) {
            return _.get(this.props, ['data', 'groups', this.props.groupId, 'weeks', dateString, 'week']);
        } else if(this.props.teacherId) {
            return _.get(this.props, ['data', 'teachers', this.props.teacherId, 'weeks', dateString, 'week']);
        }
    },
    
    renderHeader: function(data) {
        if (this.props.groupId) {
            return <h3 className="page__h3">{data.faculty.abbr} Группа № {data.group.name} расписание с {this.from()} по {this.to()}</h3>
        } else if(this.props.teacherId) {
            return <h3 className="page__h3">{data.teacher.full_name}, расписание с {this.from()} по {this.to()}</h3>
        }
    },
    
    render: function() {
        if (this.props.isFetching) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }
        
        var extract
        if (this.props.groupId) {
            extract = this.extractByGroup
        } else if(this.props.teacherId) {
            extract = this.extractByTeacher
        }
        var data1 = extract(this.props.currentWeek)
        var data2 = extract(this.props.nextWeek)

        var data = _.merge(data1, data2)

        if(_.isEmpty(data.weeks) || (_.isEmpty(data.weeks.even) && _.isEmpty(data.weeks.odd)) ) {
            return (
                <div className="schedule-page">
                    <h3 className="page__h3">Занятий нет</h3>
                </div>
            )
        }
        
        return (
            <div className="schedule-page">
                {this.renderHeader(data)}
                <LessonsTablePdf lessons={data.weeks} showGroups={Boolean(this.props.teacherId)} />
            </div>
        )
    },

    componentDidUpdate: function() {
        if(!this.props.isFetching) {
            //mark page as ready for rendering, readed by phantomjs pdf.js script
            window.readyForPdfRendering = true
        }
    },

    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        data: React.PropTypes.object,

        // required one of these
        groupId: React.PropTypes.number,
        teacherId: React.PropTypes.number,
        
        currentWeek: React.PropTypes.object.isRequired,
        nextWeek: React.PropTypes.object.isRequired
    }
});

function mapStateToProps(state) {
    return {
        isFetching: state.weeks.isFetching,
        data: state.weeks.data
    }
}

ScheduleGridView = reactRedux.connect(mapStateToProps)(ScheduleGridView)

var RouterWrapper = React.createClass({
    render: function() {
        var location = this.props.location;
        var currentWeekString = location.query && location.query.date;
        var currentWeek = du.getWeek(currentWeekString)
        var nextWeek = currentWeek.clone().add(1, 'weeks')
        var groupId = parseInt(this.props.params.groupId, 10);
        var teacherId = parseInt(this.props.params.teacherId, 10);
        
        if (groupId) {
            return <ScheduleGridView groupId={groupId} currentWeek={currentWeek} nextWeek={nextWeek} />
        } else if (teacherId) {
            return <ScheduleGridView teacherId={teacherId} currentWeek={currentWeek} nextWeek={nextWeek} />
        }
    }
})

module.exports = {component: ScheduleGridView, routerWrapper: RouterWrapper};
