var React = require('react');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');

var Schedule = React.createClass({
    componentDidMount: function() {
        var facultyId = this.props.params.facultyId;
        var groupId = this.props.params.groupId;

        this.props.dispatch(actions.fetchLessons(facultyId, groupId));
    },

    render: function() {
        var facultyId = this.props.params.facultyId;
        var groupId = this.props.params.groupId;
        var faculty = this.props.faculties.find(function(faculty) {return faculty.id == facultyId});
        var lessons = faculty.groups
            .find(function(group) {
                return group.id == groupId
            })['lessons'];

        if (this.props.isFetching) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <div>{
                lessons &&
                <ul>
                    {lessons.map((day) =>
                        <li>{day.date} {day.lessons && <ul>
                            {day.lessons.map((lesson) => <li>
                                {lesson.time_start} {lesson.subject}
                            </li>)}
                        </ul>}</li>
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
        isFetching: state.entities.isFetching,
        faculties: state.entities.faculties
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Schedule);
