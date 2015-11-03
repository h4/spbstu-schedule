import path from 'path';
import Express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';

import { createMainStore } from './js/store/mainStore';
import Root from './js/containers/Root';
import { fetchFaculties } from './js/actions/FacultyActions';

import {ReduxRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import {reduxReactRouter, match} from 'redux-router/server';
import {Provider} from 'react-redux';
import qs from 'query-string';
import { routes, pathEnum } from './js/routes';

import { callApi } from './js/midleware/api';

const app = new Express();

var fs = require('fs');
var html = fs.readFileSync('./index.html');

app.use('/assets', Express.static('assets'));
app.use('/img', Express.static('img'));
app.use('/favicon.ico', Express.static('img/favicon.ico'));

app.use(handleRender);

function handleRender(req, res) {
    const store = createMainStore(reduxReactRouter, createHistory);

    store.dispatch(match(req.originalUrl, (err, redirectLocation, routerState) => {
        if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (err) {
            console.error('ROUTER ERROR:', (error));
            res.status(500);
            res.end(500);
        } else if (!routerState) {
            res.status(500);
            res.end(500);
        } else {
            let params = routerState.params;
            let path = routerState.routes[1].path || routerState.routes[0].path;
            let location = routerState.location;
            let endpoint;
            let actionType;

            switch (path) {
                case pathEnum.faculties:
                    endpoint = 'faculties';
                    actionType = 'FETCH_FACULTIES';
                    break;
                case pathEnum.groups:
                    endpoint = `faculties/${params.facultyId}/groups`;
                    actionType = 'FETCH_GROUPS';

                    break;
                case pathEnum.groupScheduleDefault:
                    endpoint = `scheduler/${params.groupId}${location.search}`;
                    actionType = 'FETCH_LESSONS';

                    break;
                case pathEnum.teacherScheduleDefault:
                    endpoint = `teachers/${params.teacherId}/scheduler${location.search}`;
                    actionType = 'FETCH_TEACHER';

                    break;
                case pathEnum.placeScheduleDefault:
                    endpoint = `buildings/${params.buildingId}/rooms/${params.placeId}/scheduler${location.search}`;
                    actionType = 'FETCH_PLACE';

                    break;
                default:
                    res.status(404);
                    res.end('404');
            }

            callApi(endpoint)
                .then((response) => {
                    store.dispatch({
                        type: actionType,
                        response
                    });

                    const html = renderToString(
                        <Root store={store} />
                    );

                    // Grab the initial state from our Redux store
                    const finalState = store.getState();

                    // Send the rendered page back to the client
                    res.send(renderFullPage(html, finalState));
                    res.end('');
                });
        }
    }));
}

function apiSuccessHandler(store, eventType, response) {

}

function renderFullPage(html, initialState) {
    return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Расписание занятий</title>
        <link href="http://fonts.googleapis.com/css?family=Ubuntu:400,700" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="/assets/bundle.css">
    </head>
    <body class="page">
    <header class="page__header">
        <a href="/" class="logo page__logo">
            <img src="/img/logo.svg"
                 alt="Политехнический университет Петра Великого"
                 class="logo__img">
        </a>

        <h1 class="page__headline">Расписание занятий</h1>
    </header>
    <div id="rootPageContainer" class="page__container">${html}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    <footer class="page__footer footer">
        <p class="footer__item">
            &copy; Санкт-Петербургский политехнический университет Петра Великого,
            <a href="http://www.spbstu.ru/">www.spbstu.ru</a>
        </p>

        <p class="footer__item">
            О любых ошибках и неточностях в расписании сообщайте, пожалуйста, по адресу <a href="mailto:ruz@spbstu.ru">ruz@spbstu.ru</a>
        </p>
    </footer>
    <script src="/assets/bundle.js"></script>
    </body>
    </html>
`;
}

module.exports = app;
