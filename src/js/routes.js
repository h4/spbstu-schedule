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
    TeacherListSearch = require('./components/TeacherListSearch.jsx'),
    Place = require('./components/Place.jsx');

const pathEnum = {
        faculties: '/',
        groups: '/faculty/:facultyId/groups',
        groupScheduleDefault: '/faculty/:facultyId/groups/:groupId',
        groupSchedule: '/faculty/:facultyId/groups/:groupId?date=:date',
        teacherScheduleDefault: '/teachers/:teacherId',
        teacherSchedule: '/teachers/:teacherId?date=:date',
        placeScheduleDefault: '/places/:buildingId/:placeId',
        placeSchedule: '/places/:buildingId/:placeId?date=:date',
        searchTeacher: '/teachers'
};

var routes = (
    <Route path={pathEnum.faculties} component={App}>
        <IndexRoute component={FacultyList} />
        <Route path={pathEnum.groups} component={Faculty} />
        <Route path={pathEnum.groupScheduleDefault} component={Schedule} />
        <Route path={pathEnum.groupSchedule} component={Schedule} />
        <Route path={pathEnum.teacherScheduleDefault} component={Teacher} />
        <Route path={pathEnum.teacherSchedule} component={Teacher} />
        <Route path={pathEnum.placeScheduleDefault} component={Place} />
        <Route path={pathEnum.placeSchedule} component={Place} />
        <Route path={pathEnum.searchTeacher} component={TeacherListSearch} />
    </Route>
);

module.exports = { routes, pathEnum };
