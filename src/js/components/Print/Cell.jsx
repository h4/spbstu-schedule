var React = require('react');
var _ = require('lodash');

var Teachers = React.createClass({
    teacherName: function(teacher) {
        return teacher.first_name + ' ' + _.first(teacher.middle_name) + '. ' + _.first(teacher.last_name) + '.'
    },

    render: function() {
        var teachers = this.props.value
        if(!teachers || teachers.length == 0) return <div className='teacher' />;

        return <div className='teacher'>{this.teacherName(teachers[0])}</div>
    }
})

var Place = React.createClass({
    placeName: function(place) {
        var building = place.building.abbr || ''
        return building + ' ' + place.name
    },

    render: function() {
        var places = this.props.value
        if(!places || places.length == 0) return <div className='place' />;

        return <div className='place'>{this.placeName(places[0])}</div>
    }
})

var Cell = React.createClass({
    render: function () {
        var lesson = this.props.lesson
        if(!lesson) return <td>&nbsp;</td>;

        return (
            <td>
                <div className='cell'>
                    <div className='subject'>{lesson.subject_short}</div>
                    <div className='type'>{lesson.typeObj.name}</div>
                    <Teachers value={lesson.teachers} />
                    <Place value={lesson.auditories} />
                </div>
            </td>
        )
    }
});

module.exports = Cell;
