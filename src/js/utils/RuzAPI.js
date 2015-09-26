var FacultyActions = require('../actions/FacultyActions');

module.exports = {
    getFacultyData: function () {
        FacultyActions.fetchFaculties();
    }
};
