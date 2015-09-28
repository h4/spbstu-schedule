var React = require('react'),
    App = require('./containers/App'),
    FacultyList = require('./components/FacultyList.jsx'),
    Faculty = require('./components/Faculty.jsx'),
    createBrowserHistory = require('history/lib/createBrowserHistory'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    Provider = require('react-redux').Provider,
    configureStore = require('./store/mainStore');

var history = createBrowserHistory();
var store = configureStore();

var routes = (<Route handler={App} path="/">
    <DefaultRoute handler={FacultyList} />
    <Route handler={Faculty} path="faculty/:facultyId/groups" />
</Route>);

Router.run(routes, Router.HistoryLocation, function(Handler, routerState) { // note "routerState" here
    React.render(
        <Provider store={store}>{function() {return <Handler routerState={routerState} />}}</Provider>,
        document.getElementById('root')
    );
});
