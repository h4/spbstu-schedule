'use strict';
var redux = require('redux');

function entities(state, action) {
    state = state || { faculties: [] };
    switch (action.type) {
        case 'FETCH_FACULTIES':
            return state.faculties = action.faculties;
        default :
            return state;
    }
}

module.exports = {
    rootReducer: redux.combineReducers({entities: entities})
};
