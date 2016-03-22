'use strict';
var redux = require('redux');
var _ = require('lodash');
import { routerStateReducer } from 'redux-router';

function faculties(state, action) {
    var baseState = {
        isFetching: false,
        data: null,
        errors: null
    };
    state = _.extend(baseState, state);

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
        faculty: null,
        errors: null
    };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'REQUEST_GROUPS':
            state.isFetching = true;
            return state;
            break;
        case 'FETCH_GROUPS':
            state.isFetching = false;
            state.data = state.data || {};
            state.data[action.response.faculty.id] = action.response.groups;
            state.faculty = action.response.faculty;
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
    state = _.extend(baseState, state);

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
    state = _.extend(baseState, state);

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

function search(state, action) {
    var baseState = {
            isFetching: false,
            data: null,
            errors: null
        };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'REQUEST_TEACHERS_LIST':
            state.isFetching = true;
            return state;
        case 'FETCH_TEACHERS_LIST':
            state.data = _.chain(action.response.teachers)
                .sortBy('full_name')
                .filter(function(teacher) {
                    return teacher.full_name !== "00"
                })
                .value();
            state.isFetching = false;
            return state;
        case 'FAIL_TEACHERS_LIST':
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
    state = _.extend(baseState, state);

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

function groupTypeFilter(state, action) {
    var baseState = {
        filter: 'all'
    };
    state = _.extend(baseState, state);

    switch (action.type) {
        case 'SET_GROUPTYPE_FILTER':
            state.filter = action.filter;
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
    search,
    groupTypeFilter,
    router: routerStateReducer
});

export default rootReducer;
