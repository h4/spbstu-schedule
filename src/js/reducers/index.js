'use strict';
var redux = require('redux');

function faculties(state, action) {
    state = state || {
            isFetching: false,
            data: null,
            errors: null
        };

    switch (action.type) {
        case 'REQUEST_FACULTIES':
            state.isFetching = true;
            return state;
        case 'FETCH_FACULTIES':
            state.data = action.faculties;
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
    state = state || {
            isFetching: false,
            data: null,
            errors: null
        };
    switch (action.type) {
        case 'REQUEST_GROUPS':
            state.isFetching = true;
            return state;
        case 'FETCH_GROUPS':
            state.data = state.data || {};
            state.data[action.faculty] = action.groups;
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
    state = state || {
            isFetching: false,
            data: null,
            week: null,
            errors: null
        };
    switch (action.type) {
        case 'REQUEST_LESSONS':
            state.isFetching = true;
            return state;
        case 'FETCH_LESSONS':
            state.data = state.data || {};
            state.data[action.group] = action.lessons;
            state.week = action.week;
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
    state = state || {
            isFetching: false,
            teacher: null,
            data: null,
            week: null,
            errors: null
        };
    switch (action.type) {
        case 'REQUEST_TEACHER':
            state.isFetching = true;
            return state;
        case 'FETCH_TEACHER':
            state.data = state.data || {};
            state.data[action.teacherId] = action.lessons;
            state.teacher = action.teacher;
            state.week = action.week;
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
    state = state || {
            isFetching: false,
            data: null,
            place: null,
            week: null,
            errors: null
        };
    switch (action.type) {
        case 'REQUEST_PLACE':
            state.isFetching = true;
            return state;
        case 'FETCH_PLACE':
            state.data = state.data || {};
            state.data[action.placeId] = action.lessons;
            state.place = action.place;
            state.week = action.week;
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

module.exports = {
    rootReducer: redux.combineReducers({
        faculties: faculties,
        groups: groups,
        lessons: lessons,
        teachers: teachers,
        places: places
    })
};
