var api = require('../midleware/api');
var REQUEST_FACULTIES = 'REQUEST_FACULTIES';
var FETCH_FACULTIES = 'FETCH_FACULTIES';
var REQUEST_GROUPS = 'REQUEST_GROUPS';
var FETCH_GROUPS = 'FETCH_GROUPS';
var REQUEST_LESSONS = 'REQUEST_LESSONS';
var FETCH_LESSONS = 'FETCH_LESSONS';

function requestFaculties() {
    return {
        type: REQUEST_FACULTIES
    };
}

function fetchFaculties(response) {
    return {
        type: FETCH_FACULTIES,
        faculties: response.faculties
    }
}

function requestGroups() {
    return {
        type: REQUEST_GROUPS
    };
}

function fetchGroups(facultyId, response) {
    return {
        type: FETCH_GROUPS,
        faculty: facultyId,
        groups: response.groups
    }
}

function requestLessons() {
    return {
        type: REQUEST_LESSONS
    };
}

function fetchLessons(facultyId, groupId, response) {
    return {
        type: FETCH_LESSONS,
        faculty: facultyId,
        group: groupId,
        lessons: response.days,
        week: response.week
    }
}

module.exports = {
    fetchFaculties: function () {
        return function(dispatch) {
            dispatch(requestFaculties());
            return api('faculties', function(response) {
                dispatch(fetchFaculties(response));
            });
        };
    },

    fetchGroups: function(id) {
        var endpoint = 'faculties/' + id + '/groups';

        return function(dispatch) {
            dispatch(requestGroups());
            return api(endpoint, function (response) {
                dispatch(fetchGroups(id, response));
            });
        };
    },

    fetchLessons: function(faculyId, groupId, date) {
        var endpoint = 'scheduler/' + groupId;
        if (date) {
            endpoint += '?date=' + date;
        }

        return function(dispatch) {
            dispatch(requestLessons());
            return api(endpoint, function (response) {
                dispatch(fetchLessons(faculyId, groupId, response));
            });
        };
    }
};
