'use strict';
var React = require('react');
var Link = require('react-router').Link;

var Groups = React.createClass({
    render: function() {
        return (
            <div className="lesson__groups">
                Группы:&nbsp;
                {this.props.data.map(function(group, i) {
                    return (
                        <span key={i} className="lesson__group">
                            <Link to={`/faculty/${group.faculty.id}/groups/${group.id}`}
                                  className="lesson__link"
                                  activeClassName="lesson__link_active">
                                {group.name}
                            </Link>
                        </span>
                    )
                })}
            </div>
        )
    }
});

module.exports = Groups;
