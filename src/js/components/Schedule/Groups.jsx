'use strict';
var React = require('react');

var Groups = React.createClass({
    render: function() {
        return (
            <div className="lesson__groups">
                Группы:&nbsp;
                {this.props.data.map(function(group, i) {
                    return (
                        <span key={i} className="lesson__group">
                            {group.name}
                        </span>
                    )
                })}
            </div>
        )
    }
});

module.exports = Groups;
