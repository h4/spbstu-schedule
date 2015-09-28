'use strict';
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Расписание</h1>

                <RouteHandler />
            </div>
        )
    }
});

module.exports = App;

