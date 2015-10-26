'use strict';
var fetch = require('isomorphic-fetch');

var API_ROOT = 'http://ruz2.spbstu.ru/api/v1/ruz/';

function callApi(endpoint) {
    var fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

    return fetch(fullUrl)
        .then(function(response) {
            return response.json();
        });
}

export default store => next => action => {
    if (action.callApi === undefined) {
        return next(action);
    }
    const callAPI = action.callApi;

    let { endpoint } = callAPI;
    const { types } = callAPI;

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction['callApi'];
        return finalAction;
    }

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    return callApi(endpoint).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Не удалось связаться с сервером'
        }))
    );

    //var actionType = action.type;
    //
    //if (typeof actionType === 'undefined') {
    //    return next(action);
    //}
    //
    //console.log('here');
    //return callApi(endpoint).then(function(response) {
    //    callback(response);
    //});
};
