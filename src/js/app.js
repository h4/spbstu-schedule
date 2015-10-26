var React = require('react'),
    render = require('react-dom').render,
    Root = require('./containers/Root'),
    configureStore = require('./store/mainStore');

require('es6-promise').polyfill();

var store = configureStore();

render(<Root store={store} />,
    document.getElementById('root')
);
