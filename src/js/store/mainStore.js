import { createStore, applyMiddleware, compose } from 'redux';
import { routes } from '../routes';
import thunk from 'redux-thunk';
import api from '../midleware/api';
import rootReducer from '../reducers/index';

export function createMainStore(reduxReactRouter, createHistory, initialState) {
    let finalCreateStore = compose(
        applyMiddleware(thunk, api),
        reduxReactRouter({
            routes,
            createHistory: createHistory
        })
    )(createStore);

    return finalCreateStore(rootReducer, initialState);
}


