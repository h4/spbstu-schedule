var React = require('react'),
    createBrowserHistory = require('history/lib/createBrowserHistory'),
    Router = require('react-router'),
    Provider = require('react-redux').Provider,
    configureStore = require('./store/mainStore'),
    routes = require('./routes');

require('es6-promise').polyfill();

var history = createBrowserHistory();
var store = configureStore();

Router.run(routes, Router.HistoryLocation, function(Handler, routerState) { // note "routerState" here
    React.render(
        <Provider store={store}>{function() {return <Handler routerState={routerState} />}}</Provider>,
        document.getElementById('root')
    );
});
