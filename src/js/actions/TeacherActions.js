var api = require('../midleware/api');
var REQUEST_TEACHER = 'REQUEST_TEACHER';
var FETCH_TEACHER = 'FETCH_TEACHER';
var FAIL_TEACHER = 'FAIL_TEACHER';

function fetchTeacher(teacherId, date) {
    let endpoint = `teachers/${teacherId}/scheduler`;
    if (date) {
        endpoint = `${endpoint}?date=${date}`;
    }

    return {
        callApi: {
            types: [REQUEST_TEACHER, FETCH_TEACHER, FAIL_TEACHER],
            endpoint
        }
    }
}

module.exports = {
    fetchTeacher: function(teacherId, date) {
        return function(dispatch) {
            return dispatch(fetchTeacher(teacherId, date));
        };
    }
};
