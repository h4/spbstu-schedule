var api = require('../midleware/api');
var FETCH_FACULTIES = 'FETCH_FACULTIES';

function fetchFaculties(faculties) {
    return {
        type: FETCH_FACULTIES,
        faculties: faculties
    }
}

module.exports = {
    fetchFaculties: function () {
        return function(dispatch) {
            return api('faculties', function(response) {
                dispatch(fetchFaculties(response));
            });
        };
    }
};
