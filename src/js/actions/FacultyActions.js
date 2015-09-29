var api = require('../midleware/api');
var REQUEST_FACULTIES = 'REQUEST_FACULTIES';
var FETCH_FACULTIES = 'FETCH_FACULTIES';
var REQUEST_GROUPS = 'REQUEST_GROUPS';
var FETCH_GROUPS = 'FETCH_GROUPS';

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
    }
};
