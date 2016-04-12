var React = require('react');
var _ = require('lodash');

var subgroupName = function(subgroup) {
    var commonMatch = subgroup.match(/[пП]\/[гГ]\s*\d+/g)
    if (commonMatch === null) {
        return subgroup
    } else {
        return commonMatch[0]
    }
}

var Teachers = React.createClass({
    teacherName: function(teacher) {
        var result = teacher.first_name + ' ' + _.first(teacher.middle_name) + '.'
        if(teacher.last_name && teacher.last_name.length > 0) {
            result = result + ' ' + _.first(teacher.last_name) + '.'
        }
        if(teacher.subgroup) {
            result = result + ' (' + subgroupName(teacher.subgroup) + ')'
        }
        return result
    },

    render: function() {
        var teachers = this.props.value
        if(!teachers || teachers.length == 0) return <div className='teacher' />;

        return <ul className='teacher'>
            {_.map(teachers, t => <li key={this.teacherName(t)}>{this.teacherName(t)}</li>)}
        </ul>
    }
})

var Groups = React.createClass({
    render: function() {
        var groups = this.props.value
        if(!groups || groups.length == 0) return <div className='teacher' />;

        return <ul className='teacher'>
            {_.map(groups, g => <li key={g.name}>{g.name}</li>)}
        </ul>
    }
})

var Place = React.createClass({
    placeName: function(place) {
        var building = place.building.abbr || ''
        var result = building + ' ' + place.name
        if(place.subgroup) {
            result = result + ' (' + subgroupName(place.subgroup) + ')'
        }
        return result
    },

    sizeClass: function(placeName) {
        if (placeName.length > 16) {
            return 'small'
        } else {
            return null
        }
    },

    render: function() {
        var places = this.props.value
        if(!places || places.length == 0) return <div className='place' />;

        return <ul className='place'>
            {_.map(places, p => {
                var placeName = this.placeName(p)
                var sizeClass = this.sizeClass(placeName)
                return <li className={sizeClass} key={placeName}>
                    {placeName}
                </li>
            })}
        </ul>
    }
})

var Lesson = React.createClass({
    render: function() {
        var lesson = this.props.lesson
        return <div className='cell'>
            <div className='subject'>{lesson.subject_short}</div>
            {this.props.showGroups ? <Groups value={lesson.groups} /> : <Teachers value={lesson.teachers} />}
            <div className='type'>{lesson.typeObj.abbr}</div>
            <Place value={lesson.auditories} />
        </div>
    }
})

var Cell = React.createClass({

    weekClass: function() {
        if(this.props.odd) {
            return 'odd_week'
        }
        return null
    },

    render: function () {
        var lessons = this.props.lessons
        if(!lessons || lessons.length == 0) return <td rowSpan={this.props.merge ? '2' : null}>&nbsp;</td>;

        return <td className={this.weekClass()} rowSpan={this.props.merge ? '2' : null}>
            {_.map(lessons, (l, i) => <Lesson key={i} lesson={l} showGroups={this.props.showGroups} />)} 
        </td>
    }
});

module.exports = Cell;
