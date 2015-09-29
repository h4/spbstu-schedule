var React = require('react');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');
var Groups = require('./Groups.jsx');

var Faculty = React.createClass({
    componentDidMount: function() {
        var id = this.props.params.facultyId;

        this.props.dispatch(actions.fetchGroups(id));
    },

    render: function() {
        var id = this.props.params.facultyId;
        var faculty = this.props.faculties.find(function(faculty) {return faculty.id == id});

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
                    faculty.groups &&
                    <div className="groups-list">
                        <Groups groups={faculty.groups} facultyId={faculty.id}/>
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
        isFetching: state.entities.isFetching,
        faculties: state.entities.faculties
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Faculty);
