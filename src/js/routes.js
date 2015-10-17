'use strict';
var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    App = require('./containers/App'),
    FacultyList = require('./components/FacultyList.jsx'),
    Faculty = require('./components/Faculty.jsx'),
    Schedule = require('./components/Schedule.jsx');

var routes = (<Route handler={App} path="/">
    <DefaultRoute handler={FacultyList} />
    <Route handler={Faculty} path="faculty/:facultyId/groups" />
    <Route handler={Schedule} path="faculty/:facultyId/groups/:groupId" />
    <Route handler={Schedule} path="faculty/:facultyId/groups/:groupId?date=:date" />
</Route>);

module.exports = routes;
