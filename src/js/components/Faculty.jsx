var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');
var Groups = require('./Groups.jsx');

var Faculty = React.createClass({
    componentDidMount: function() {
        var id = this.props.params.facultyId;

        this.props.dispatch(actions.fetchGroups(id));
    },

    render: function() {
        var facultyId = parseInt(this.props.params.facultyId, 10);
        var faculty = _.find(this.props.faculties, 'id', facultyId);
        var groups = this.props.groups && this.props.groups[facultyId];

        if (this.props.isFetching) {
            return (
                <div>
                    <h2>{faculty.name}</h2>
                    <div>Loading...</div>
                </div>
            )
        }

        return (
            <div>
                <h2>{faculty.name}</h2>
                {
                    groups &&
                    <div className="groups-list">
                        <Groups groups={groups} facultyId={faculty.id}/>
                    </div>
                }
            </div>
        )
    }
});

Faculty.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.groups.isFetching,
        faculties: state.faculties.data,
        groups: state.groups.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Faculty);
