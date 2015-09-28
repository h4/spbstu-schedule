var React = require('react');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');
var Faculties = require('./Faculties.jsx');

var FacultyList = React.createClass({
    componentDidMount: function() {
        this.props.dispatch(actions.fetchFaculties());
    },

    render: function() {
        if (this.props.isFetching) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <div>{
                this.props.faculties &&
                <div className="facultity-list">
                    <Faculties faculties={this.props.faculties} />
                </div>
            }</div>
        )
    }
});

FacultyList.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.entities.isFetching,
        faculties: state.entities.faculties
    }
}

module.exports = reactRedux.connect(mapStateToProps)(FacultyList);
