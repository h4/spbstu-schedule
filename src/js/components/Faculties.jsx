'use strict';
var React = require('react');
var Link = require('react-router').Link;

var Faculties = React.createClass({
    render: function() {
        return (
            <ul>
            {this.props.faculties.map((faculty, i) =>
                    <li key={i}><Link to={`/faculty/${faculty.id}/groups`}>{faculty.name}</Link></li>
            )}
            </ul>
        )
    }
});

module.exports = Faculties;
