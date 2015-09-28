'use strict';
var React = require('react');
var Link = require('react-router').Link;

var Groups = React.createClass({
    render: function() {
        return (
            <ul>
                {this.props.groups.map((group, i) =>
                        <li key={i}><Link to={`/faculty/${this.props.facultyId}/groups/${group.id}`}>{group.name}</Link></li>
                )}
            </ul>
        )
    }
});

module.exports = Groups;
