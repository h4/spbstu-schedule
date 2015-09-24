window.React = require('react');
var RuzData = require('./RuzData'),
    RuzAPI = require('./utils/RuzAPI'),
    FacultyList = require('./components/FacultyList.react');

RuzData.init();

RuzAPI.getFacultyData();

React.render(
    <FacultyList />,
    document.getElementById('faculty-list')
);
