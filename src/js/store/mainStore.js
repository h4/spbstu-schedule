import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import routes from '../routes';
import thunk from 'redux-thunk';
import api from '../midleware/api';
import rootReducer from '../reducers/index';

const finalCreateStore = compose(
    applyMiddleware(thunk, api),
    reduxReactRouter({ routes, createHistory })
)(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}

/**
'use strict';
var reduxReactRouter = require('redux-router').reduxReactRouter,
    redux = require('redux'),
    history = require('history'),
    thunk = require('redux-thunk'),
    reducers = require('../reducers'),
    routes = require('../routes'),
    api = require('../midleware/api');

var createHistory = history.createHistory;
var finalCreateStore = redux.compose(
    redux.applyMiddleware(thunk, api),
    reduxReactRouter({ routes, createHistory })
)(redux.createStore);

module.exports = function (initialState) {
    return finalCreateStore(reducers.rootReducer, initialState);
};
*/