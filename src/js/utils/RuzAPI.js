var FacultyActions = require('../actions/FacultyActions');

module.exports = {
    getFacultyData: function () {
        var data = JSON.parse(localStorage.getItem('faculty'));
        FacultyActions.receiveFaculty(data);
    }
};
