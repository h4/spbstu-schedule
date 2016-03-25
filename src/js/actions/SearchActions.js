var api = require('../midleware/api');
var REQUEST_TEACHERS_LIST = 'REQUEST_TEACHERS_LIST';
var FETCH_TEACHERS_LIST = 'FETCH_TEACHERS_LIST';
var FAIL_TEACHERS_LIST = 'FAIL_TEACHERS_LIST';
var REQUEST_GROUPS_LIST = 'REQUEST_GROUPS_LIST';
var FETCH_GROUPS_LIST = 'FETCH_GROUPS_LIST';
var FAIL_GROUPS_LIST = 'FAIL_GROUPS_LIST';


function fetchTeachersList() {
    let endpoint = `teachers`;

    return {
        callApi: {
            types: [REQUEST_TEACHERS_LIST, FETCH_TEACHERS_LIST, FAIL_TEACHERS_LIST],
            endpoint
        }
    }
}

function fetchGroupsList(searchString) {
    searchString = encodeURIComponent(searchString)
    let endpoint = `search/groups?q=${searchString}`;

    return {
        callApi: {
            types: [REQUEST_GROUPS_LIST, FETCH_GROUPS_LIST, FAIL_GROUPS_LIST],
            endpoint
        }
    }
}


module.exports = {
    fetchTeachersList: function() {
        return function(dispatch) {
            return dispatch(fetchTeachersList());
        };
    },

    fetchGroupsList: function(searchString) {
        return function(dispatch) {
            return dispatch(fetchGroupsList(searchString));
        };
    }
};
