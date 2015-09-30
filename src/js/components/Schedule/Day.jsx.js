'use strict';
var React = require('react');
var Lesson = require('./Lesson.jsx');

var Day = React.createClass({
    render: function() {
        return (
            <li>{this.props.date} {this.props.lessons && <ul>
                {this.props.lessons.map((lesson, i) =>
                    <Lesson key={i} data={lesson} />
                )}
            </ul>}</li>
        )
    }
});

module.exports = Day;
