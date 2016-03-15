'use strict';
var React = require('react');
var Link = require('react-router').Link;

var Faculties = React.createClass({
    render: function() {
        return (
            <ul className="faculty-list__list">
            {this.props.faculties.map((faculty, i) =>
                    <li key={i} className="faculty-list__item">
                        <Link to={`/faculty/${faculty.id}/groups?type=${this.props.groupType}`} className="faculty-list__link">{faculty.name}</Link>
                    </li>
            )}
            </ul>
        )
    },

    getDefaultProps: function() {
        return {groupType: 'all'};
    }
});

module.exports = Faculties;
