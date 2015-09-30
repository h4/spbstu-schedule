var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');
var Day = require('./Schedule/Day.jsx');

var Schedule = React.createClass({
    componentDidMount: function() {
        var facultyId = this.props.params.facultyId;
        var groupId = this.props.params.groupId;

        this.props.dispatch(actions.fetchLessons(facultyId, groupId));
    },

    render: function() {
        var groupId = parseInt(this.props.params.groupId, 10);
        var facultyId = parseInt(this.props.params.facultyId, 10);
        var faculty = _.find(this.props.faculties, 'id', facultyId);
        var group = _.find(this.props.groups[facultyId], 'id', groupId);
        var lessons = this.props.lessons && this.props.lessons[groupId];

        if (this.props.isFetching) {
            return (
                <div>
                    {faculty.name && <h2>{faculty.name}</h2>}
                    {group.name && <h3>{group.name}</h3>}
                    <div>Loading...</div>
                </div>
            )
        }

        return (
            <div>
                <h2>{faculty.name}</h2>
                <h3>{group.name}</h3>
                {
                lessons &&
                <ul>
                    {lessons.map((day, i) =>
                        <Day key={i} date={day.date} lessons={day.lessons} />
                    )}
                </ul>
            }</div>
        )
    }
});

Schedule.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.lessons.isFetching,
        groups: state.groups.data,
        faculties: state.faculties.data,
        lessons: state.lessons.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Schedule);
