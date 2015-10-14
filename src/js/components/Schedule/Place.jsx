'use strict';
var React = require('react');

var Place = React.createClass({
    render: function() {
        return (
            <div className="lesson__places">
                {this.props.data.map(function(place, i) {
                    return (
                        <div key={i}>
                            {place.building && <span>{place.building.name}, {place.building.address} </span> }
                            {place.name && <span>ауд. {place.name}</span> }
                        </div>
                    )
                })}
            </div>
        )
    }
});

module.exports = Place;
