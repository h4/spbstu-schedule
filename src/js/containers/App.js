'use strict';
var React = require('react');
var ReactRouter = require('react-router');
var Redux = require('react-redux');

var App = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        pushState: React.PropTypes.func.isRequired
    },

    render: function() {
        const { children } = this.props;

        return (
            <div>
                { children }
            </div>
        )
    }
});

function mapStateToProps(state) {
    return {};
}

module.exports = Redux.connect(mapStateToProps, {pushState: ReactRouter.pushState})(App);
