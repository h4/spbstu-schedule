var api = require('../midleware/api');
var REQUEST_TEACHERS_LIST = 'REQUEST_TEACHERS_LIST';
var FETCH_TEACHERS_LIST = 'FETCH_TEACHERS_LIST';
var FAIL_TEACHERS_LIST = 'FAIL_TEACHERS_LIST';

function fetchTeachersList() {
    let endpoint = `teachers`;

    return {
        callApi: {
            types: [REQUEST_TEACHERS_LIST, FETCH_TEACHERS_LIST, FAIL_TEACHERS_LIST],
            endpoint
        }
    }
}

module.exports = {
    fetchTeachersList: function() {
        return function(dispatch) {
            return dispatch(fetchTeachersList());
        };
    }
};
