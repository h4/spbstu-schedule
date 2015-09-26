'use strict';
var React = require('react');

var Faculties = React.createClass({
    render: function() {
        return (
            <ul>
            {this.props.faculties.map((faculty, i) =>
                    <li key={i}>{faculty.name}</li>
            )}
            </ul>
        )
    }
});

module.exports = Faculties;
