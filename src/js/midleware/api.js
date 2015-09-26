'use strict';
var fetch = require('isomorphic-fetch');

var API_ROOT = 'http://ruz2.spbstu.ru/api/v1/ruz/';

function callApi(endpoint) {
    var fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

    return fetch(fullUrl).then(function(response) {
        return response.json();
    });
}

module.exports = function(endpoint, action) {
    return callApi(endpoint).then(function(response) {
        action(response);
    })
};
