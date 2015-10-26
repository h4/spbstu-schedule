'use strict';
var React = require('react');
var Provider = require('react-redux').Provider;
var ReduxRouter = require('redux-router').ReduxRouter;

var Root = React.createClass({
    propTypes: {
        store: React.PropTypes.object.isRequired
    },

    render: function() {
        const store = this.props.store;
        return (
            <Provider store={store}>
                <ReduxRouter />
            </Provider>
        );
    }
});

module.exports = Root;
