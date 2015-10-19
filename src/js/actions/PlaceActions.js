var api = require('../midleware/api');
var REQUEST_PLACE = 'REQUEST_PLACE';
var FETCH_PLACE = 'FETCH_PLACE';

function requestPlace() {
    return {
        type: REQUEST_PLACE
    };
}

function fetchPlace(placeId, response) {
    return {
        type: FETCH_PLACE,
        placeId: placeId,
        lessons: response.days,
        place: response.room,
        week: response.week
    }
}

module.exports = {
    fetchPlace: function(buildingId, placeId, date) {
        var endpoint = 'buildings/' + buildingId + '/rooms/' + placeId + '/scheduler';
        if (date) {
            endpoint += '?date=' + date;
        }

        return function(dispatch) {
            dispatch(requestPlace());
            return api(endpoint, function (response) {
                dispatch(fetchPlace(placeId, response));
            });
        };
    }
};
