'use strict';
var React = require('react');
var Teachers = require('./Teachers.jsx');
var Place = require('./Place.jsx');

var Lesson = React.createClass({
    render: function() {
        return (
            <li>
                <div>{this.props.data.time_start}-{this.props.data.time_start} «{this.props.data.subject}»</div>
                <div>{this.props.data.typeObj.name}</div>
                {this.props.data.teachers && <Teachers data={this.props.data.teachers} />}
                {this.props.data.auditories && <Place data={this.props.data.auditories} />}
            </li>
        )
    }
});

module.exports = Lesson;
