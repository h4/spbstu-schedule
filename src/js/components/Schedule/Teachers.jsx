'use strict';
var React = require('react');

var Teachers = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.data.map(function(person, i) {
                    return (
                        <div key={i}>
                            {person.grade} {person.full_name}
                        </div>
                    )
                })}
            </div>
        )
    }
});

module.exports = Teachers;
