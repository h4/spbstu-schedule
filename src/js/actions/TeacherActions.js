var api = require('../midleware/api');
var REQUEST_TEACHER = 'REQUEST_TEACHER';
var FETCH_TEACHER = 'FETCH_TEACHER';

function requestTeacher() {
    return {
        type: REQUEST_TEACHER
    };
}

function fetchTeacher(teacherId, response) {
    return {
        type: FETCH_TEACHER,
        teacherId: teacherId,
        lessons: response.days,
        teacher: response.teacher,
        week: response.week
    }
}

module.exports = {
    fetchTeacher: function(teacherId, date) {
        var endpoint = 'teachers/' + teacherId + '/scheduler';
        if (date) {
            endpoint += '?date=' + date;
        }

        return function(dispatch) {
            dispatch(requestTeacher());
            return api(endpoint, function (response) {
                dispatch(fetchTeacher(teacherId, response));
            });
        };
    }
};
