'use strict';
var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');

var Search = React.createClass({
    componentWillMount: function() {

    },

    render: function() {
        return <div className="search"></div>
    }
});

Search.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.places.isFetching
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Search);
