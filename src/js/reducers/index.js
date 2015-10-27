'use strict';
var redux = require('redux');
import { routerStateReducer as router } from 'redux-router';

function faculties(state, action) {
    var baseState = {
        isFetching: false,
        data: null,
        errors: null
    };
    state = Object.assign(baseState, state);

    switch (action.type) {
        case 'REQUEST_FACULTIES':
            state.isFetching = true;
            return state;
        case 'FETCH_FACULTIES':
            state.data = action.response.faculties;
            state.isFetching = false;
            return state;
        case 'FAIL_FACULTIES':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

function groups(state, action) {
    var baseState = {
        isFetching: false,
        data: null,
        errors: null
    };
    state = Object.assign(baseState, state);

    switch (action.type) {
        case 'REQUEST_GROUPS':
            state.isFetching = true;
            return state;
        case 'FETCH_GROUPS':
            state.data = state.data || {};
            state.data[action.response.faculty.id] = action.response.groups;
            state.isFetching = false;
            return state;
        case 'FAIL_GROUPS':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

function lessons(state, action) {
    var baseState =  {
        isFetching: false,
        data: null,
        group: null,
        week: null,
        errors: null
    };
    state = Object.assign(baseState, state);

    switch (action.type) {
        case 'REQUEST_LESSONS':
            state.isFetching = true;
            return state;
        case 'FETCH_LESSONS':
            state.data = state.data || {};
            state.data[action.response.group.id] = action.response.days;
            state.group = action.response.group;
            state.week = action.response.week;
            state.isFetching = false;
            return state;
        case 'FAIL_LESSONS':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

function teachers(state, action) {
    var baseState = {
            isFetching: false,
            teacher: null,
            data: null,
            week: null,
            errors: null
        };
    state = Object.assign(baseState, state);

    switch (action.type) {
        case 'REQUEST_TEACHER':
            state.isFetching = true;
            return state;
        case 'FETCH_TEACHER':
            state.data = state.data || {};
            state.data[action.response.teacher.id] = action.response.days;
            state.teacher = action.response.teacher;
            state.week = action.response.week;
            state.isFetching = false;
            return state;
        case 'FAIL_TEACHER':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

function places(state, action) {
    var baseState = {
            isFetching: false,
            data: null,
            place: null,
            week: null,
            errors: null
        };
    state = Object.assign(baseState, state);

    switch (action.type) {
        case 'REQUEST_PLACE':
            state.isFetching = true;
            return state;
        case 'FETCH_PLACE':
            state.data = state.data || {};
            state.data[action.response.room.id] = action.response.days;
            state.place = action.response.room;
            state.week = action.response.week;
            state.isFetching = false;
            return state;
        case 'FAIL_PLACE':
            state.errors = action.errors;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}
const rootReducer = redux.combineReducers({
        faculties,
        groups,
        lessons,
        teachers,
        places,
        router
    });

export default rootReducer;
