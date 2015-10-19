'use strict';
var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    App = require('./containers/App'),
    FacultyList = require('./components/FacultyList.jsx'),
    Faculty = require('./components/Faculty.jsx'),
    Schedule = require('./components/Schedule.jsx'),
    Teacher = require('./components/Teacher.jsx'),
    Place = require('./components/Place.jsx');

var routes = (<Route handler={App} path="/">
    <DefaultRoute handler={FacultyList} />
    <Route handler={Faculty} path="faculty/:facultyId/groups" />
    <Route handler={Schedule} path="faculty/:facultyId/groups/:groupId" />
    <Route handler={Schedule} path="faculty/:facultyId/groups/:groupId?date=:date" />
    <Route handler={Teacher} path="teachers/:teacherId" />
    <Route handler={Teacher} path="teachers/:teacherId?date=:date" />
    <Route handler={Place} path="places/:buildingId/:placeId" />
    <Route handler={Place} path="places/:buildingId/:placeId?date=:date" />
</Route>);

module.exports = routes;
