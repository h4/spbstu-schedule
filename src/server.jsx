import path from 'path';
import Express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';

import { createMainStore } from './js/store/mainStore';
import Root from './js/containers/Root';
import { fetchFaculties } from './js/actions/FacultyActions';

import {ReduxRouter} from 'redux-router';
import { formatPattern } from 'react-router/lib/PatternUtils';

import createHistory from 'history/lib/createMemoryHistory';
import {reduxReactRouter, match} from 'redux-router/server';
import {Provider} from 'react-redux';
import qs from 'query-string';
import { routes, pathEnum } from './js/routes';

import { callApiFactory } from './js/midleware/api';
import _ from 'lodash'
import childProcess from 'child_process'
import phantomjs from 'phantomjs-prebuilt'
import temp from 'temp'

const apiRoot = process.env.API_ROOT;
const callApi = callApiFactory(apiRoot);

const app = new Express();

var fs = require('fs');
var template = fs.readFileSync('./index.html', {encoding: 'utf-8'});
var cleanTemplate = fs.readFileSync('./pdf.html', {encoding: 'utf-8'});

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
            let route = _.last(routerState.routes);
            let path = route.path || '/';
            let location = routerState.location;
            let endpoint;
            let actionType;

            if (route.renderPdf) {
                // Send pdf file
                return sendPdf(req, res, routerState)
            }

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
                case pathEnum.groupSchedulePrint:
                    break;
                case pathEnum.teacherScheduleDefault:
                    endpoint = `teachers/${params.teacherId}/scheduler${location.search}`;
                    actionType = 'FETCH_TEACHER_SCHEDULE';

                    break;
                case pathEnum.placeScheduleDefault:
                    endpoint = `buildings/${params.buildingId}/rooms/${params.placeId}/scheduler${location.search}`;
                    actionType = 'FETCH_PLACE';

                    break;
                case pathEnum.teacherList:
                    endpoint = `teachers`;
                    actionType = 'FETCH_TEACHERS_LIST';

                    break;
                case pathEnum.searchTeacher:
                    endpoint = `search/teachers?q=${encodeURIComponent(location.query.q)}`;
                    actionType = 'FETCH_TEACHER_SEARCH';

                    break;
                case pathEnum.searchGroup:
                    endpoint = `search/groups?q=${encodeURIComponent(location.query.q)}`;
                    actionType = 'FETCH_GROUP_SEARCH';

                    break;
                default:
                    res.status(404);
                    res.end('404');
            }

            if (endpoint) {
                callApi(endpoint)
                    .then((response) => {
                        store.dispatch({
                            type: actionType,
                            response
                        });

                        render(store, route, res)
                });
            } else {
                render(store, route, res)
            }
    }}));
}

function render(store, route, res) {
    try {
        const html = renderToString(
            <Root store={store}/>
        );

        // Grab the initial state from our Redux store
        const finalState = store.getState();

        // Send the rendered page back to the client
        if(route.clean) {
            res.send(renderCleanPage(html, finalState));
        } else {
            res.send(renderFullPage(html, finalState));
        }
        res.end('');
    } catch (e) {
        res.status(500);
        res.end(e.message);
    }
}

function renderFullPage(html, initialState) {
    return template
        .replace('${html}', html)
        .replace('${initialState}', JSON.stringify(initialState));
}

function renderCleanPage(html, initialState) {
    return cleanTemplate
        .replace('${html}', html)
        .replace('${initialState}', JSON.stringify(initialState));
}

function sendPdf(req, res, routerState) {
    let params = routerState.params;
    let route = _.last(routerState.routes);

    var pageSize = route.renderPdf.pageSize || 'A4'
    var fileName = route.renderPdf.fileName || 'ruz.pdf'
    var tempName = temp.path({suffix: '.pdf'});

    var redirectUrl = req.protocol + '://' + req.get('host') + formatPattern(route.renderPdf.redirect, params)

    try {
        childProcess.execFile(phantomjs.path, ['pdf.js', redirectUrl, tempName, pageSize])
        .on('exit', function() {
            res.sendFile(tempName, fileName, function(err) {
                fs.unlink(tempName)
            });
        })
    } catch(e) {
        fs.unlink(tempName);
        res.status(500);
        res.end(e.message);
    }
}

module.exports = app;
