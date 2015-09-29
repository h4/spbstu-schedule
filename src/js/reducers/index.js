'use strict';
var redux = require('redux');

function entities(state, action) {
    state = state || { faculties: [], isFetching: false };
    switch (action.type) {
        case 'REQUEST_FACULTIES':
            state.isFetching = true;
            return state;
        case 'FETCH_FACULTIES':
            state.faculties = action.faculties;
            state.isFetching = false;
            return state;
        case 'REQUEST_GROUPS':
            state.isFetching = true;
            return state;
        case 'FETCH_GROUPS':
            state.faculties.find(function(faculty) {return faculty.id == action.faculty;})['groups'] = action.groups;
            state.isFetching = false;
            return state;
        default :
            return state;
    }
}

module.exports = {
    rootReducer: redux.combineReducers({entities: entities})
};
