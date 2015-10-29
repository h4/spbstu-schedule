import path from 'path';
import Express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';

import { createMainStore } from './js/store/mainStore';
import App from './js/containers/App';
import { fetchFaculties } from './js/actions/FacultyActions';

import {ReduxRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import {reduxReactRouter, match} from 'redux-router/server';
import {Provider} from 'react-redux';
import qs from 'query-string';
import { routes } from './js/routes';

const app = new Express();

var fs = require('fs');
var html = fs.readFileSync('./index.html');

app.use('/assets', Express.static('assets'));
app.use('/img', Express.static('img'));

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
            console.log((store.getState().router));

            store.getState().router
                .then(() => {
                    const html = (
                        <Provider store={store} key="provider">
                            <ReduxRouter/>
                        </Provider>
                    );

                    // Grab the initial state from our Redux store
                    const finalState = store.getState();

                    // Send the rendered page back to the client
                    res.send(renderFullPage(html, finalState));
                })
                .catch((err) => {
                    console.error('DATA FETCHING ERROR:', pretty.render(err));
                    res.status(500);
                    res.end(500);
                });
        }
    }));
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
