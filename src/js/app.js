var React = require('react'),
    RuzData = require('./RuzData'),
    RuzAPI = require('./utils/RuzAPI'),
    FacultyList = require('./components/FacultyList.jsx'),
    createBrowserHistory = require('history/lib/createBrowserHistory'),
    Router = require('react-router'),
    Route = Router.Route,
    Provider = require('react-redux').Provider,
    configureStore = require('./store/mainStore');

var history = createBrowserHistory();
var store = configureStore();

var routes = (<Route handler={FacultyList} path="/spbstu-schedule/src/index.html" />);

Router.run(routes, Router.HistoryLocation, function(Handler, routerState) { // note "routerState" here
    React.render(
        <Provider store={store}>{function() {return <Handler routerState={routerState} />}}</Provider>,
        document.getElementById('root')
    );
});
