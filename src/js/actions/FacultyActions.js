var api = require('../midleware/api');
var REQUEST_FACULTIES = 'REQUEST_FACULTIES';
var FETCH_FACULTIES = 'FETCH_FACULTIES';
var FAIL_FACULTIES = 'FAIL_FACULTIES';
var REQUEST_GROUPS = 'REQUEST_GROUPS';
var FETCH_GROUPS = 'FETCH_GROUPS';
var FAIL_GROUPS = 'FETCH_GROUPS';
var REQUEST_LESSONS = 'REQUEST_LESSONS';
var FETCH_LESSONS = 'FETCH_LESSONS';
var FAIL_LESSONS = 'FETCH_LESSONS';

function fetchFaculties() {
    return {
        callApi: {
            types: [REQUEST_FACULTIES, FETCH_FACULTIES, FAIL_FACULTIES],
            endpoint: 'faculties'
        }
    }
}

function fetchGroups(groupId) {
    let endpoint = `faculties/${groupId}/groups`;

    return {
        callApi: {
            types: [REQUEST_GROUPS, FETCH_GROUPS, FAIL_GROUPS],
            endpoint
        }
    }
}

function fetchLessons(groupId, date) {
    var endpoint = `scheduler/${groupId}`;

    if (date) {
        endpoint = `${endpoint}?date=${date}`;
    }

    return {
        callApi: {
            types: [REQUEST_LESSONS, FETCH_LESSONS, FAIL_LESSONS],
            endpoint
        }
    }
}

function setGroupTypeFilter(filter) {
    return {
        type: 'SET_GROUPTYPE_FILTER',
        filter
    }
}

module.exports = {
    fetchFaculties: function () {
        return function(dispatch) {
            return dispatch(fetchFaculties());
        };
    },

    fetchGroups: function(groupId) {
        return function(dispatch) {
            return dispatch(fetchGroups(groupId));
        };
    },

    fetchLessons: function(facultyId, groupId, date) {
        return function(dispatch) {
            return dispatch(fetchLessons(groupId, date));
        };
    },

    setGroupTypeFilter: function(filter) {
        return function(dispatch) {
            return dispatch(setGroupTypeFilter(filter));
        };
    }
};
