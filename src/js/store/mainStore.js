'use strict';
var reducers = require('../reducers'),
    redux = require('redux'),
    thunkMiddleware = require('redux-thunk');

var createStoreWithMiddleware = redux.applyMiddleware(thunkMiddleware)(redux.createStore);

module.exports = function(initialState) {
    return createStoreWithMiddleware(reducers.rootReducer, initialState);
};
