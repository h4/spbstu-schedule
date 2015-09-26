var React = require('react');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');
var Faculties = require('../components/Faculties');

var FacultyList = React.createClass({
    componentDidMount: function() {
        this.props.dispatch(actions.fetchFaculties());
    },

    render: function() {
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
    dispatch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        faculties: state.entities.faculties
    }
}

module.exports = reactRedux.connect(mapStateToProps)(FacultyList);
