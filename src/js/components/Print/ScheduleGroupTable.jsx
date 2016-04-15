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
        
        this.props.dispatch(actions.fetchGroupWeeks(this.props.groupId, [du.qString(this.props.currentWeek), du.qString(this.props.nextWeek)]));
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

    extract: function(date) {
        var group = _.get(this.props.data, ['groups', this.props.groupId, 'group']);
        var faculty = group && group.faculty;
        var dateString = du.dString(date)

        var week = _.get(this.props, ['data', 'groups', this.props.groupId, 'weeks', dateString, 'week']);
        var lessons = this.lessonsByDate(this.props.groupId, dateString)
        
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
        var lessons = _.get(this.props, ['data', 'groups', groupId, 'weeks', date, 'days'])
        lessons = this.resortLessons(lessons)
        return lessons
    },

    from: function() {
        var cw = this.props.currentWeek
        var dateString = du.dString(cw)
        var week = _.get(this.props, ['data', 'groups', this.props.groupId, 'weeks', dateString, 'week']);
        var result = du.humanDate(cw)
        if(week) {
            result += ' ' + (week.is_odd ? '(нечётная неделя)' : '(чётная неделя)')
        }
        return result
    },
    to: function() {
        var nw = this.props.nextWeek
        
        var dateString = du.dString(nw)
        var week = _.get(this.props, ['data', 'groups', this.props.groupId, 'weeks', dateString, 'week']);
        var result = du.humanDate(nw.clone().add(6, 'days'))
        if(week) {
            result += ' ' + (week.is_odd ? '(нечётная неделя)' : '(чётная неделя)')
        }
        return result

    },

    render: function() {
        if (this.props.isFetching) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }
        
        var data1 = this.extract(this.props.currentWeek)
        var data2 = this.extract(this.props.nextWeek)

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
                <h3 className="page__h3">{data.faculty.abbr} Группа № {data.group.name} расписание с {this.from()} по {this.to()}</h3>
                <LessonsTablePdf ref='table' lessons={data.weeks}  />
            </div>
        )
    },

    componentDidUpdate: function() {
        var node = ReactDOM.findDOMNode(this.refs.table)
        if(!node) return;

        const limit = 950
        
        var height = node.getBoundingClientRect().height
        var width = node.getBoundingClientRect().width
        if(height > limit) {
            var scale = limit / height
            node.style.transformOrigin = '0 0';
            node.style.webkitTransformOrigin = '0 0';
            node.style.transform = 'scale(' + scale + ')';
            node.style.webkitTransform = 'scale(' + scale + ')';

            node.style.width = ((1.0 / scale) * 100) + '%';
            node.parentNode.style.height = height * scale + 'px'
        }

        if(!this.props.isFetching) {
            //mark page as ready for rendering, readed by phantomjs pdf.js script
            window.readyForPdfRendering = true
        }
    },

    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        data: React.PropTypes.object,

        groupId: React.PropTypes.number.isRequired,
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

ScheduleGroupTable = reactRedux.connect(mapStateToProps)(ScheduleGroupTable)

var RouterWrapper = React.createClass({
    render: function() {
        var location = this.props.location;
        var currentWeekString = location.query && location.query.date;
        var currentWeek = du.getWeek(currentWeekString)
        var nextWeek = currentWeek.clone().add(1, 'weeks')
        var groupId = parseInt(this.props.params.groupId, 10);

        return <ScheduleGroupTable groupId={groupId} currentWeek={currentWeek} nextWeek={nextWeek} />
    }
})

module.exports = {component: ScheduleGroupTable, routerWrapper: RouterWrapper};