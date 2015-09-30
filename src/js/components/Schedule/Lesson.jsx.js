'use strict';
var React = require('react');

var Lesson = React.createClass({
    render: function() {
        return (
            <li>{this.props.data.time_start} {this.props.data.subject}</li>
        )
    }
});

module.exports = Lesson;
