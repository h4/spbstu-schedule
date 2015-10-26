'use strict';
var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    IndexRoute = Router.IndexRoute,
    App = require('./containers/App'),
    FacultyList = require('./components/FacultyList.jsx'),
    Faculty = require('./components/Faculty.jsx'),
    Schedule = require('./components/Schedule.jsx'),
    Teacher = require('./components/Teacher.jsx'),
    Place = require('./components/Place.jsx');

var routes = (
    <Route path="/" component={App}>
        <IndexRoute component={FacultyList} />
        <Route path="/faculty/:facultyId/groups" component={Faculty} />
        <Route path="/faculty/:facultyId/groups/:groupId" component={Schedule} />
        <Route path="/faculty/:facultyId/groups/:groupId?date=:date" component={Schedule} />
        <Route path="/teachers/:teacherId" component={Teacher} />
        <Route path="/teachers/:teacherId?date=:date" component={Teacher} />
        <Route path="/places/:buildingId/:placeId" component={Place} />
        <Route path="/places/:buildingId/:placeId?date=:date" component={Place} />
    </Route>);

module.exports = routes;
