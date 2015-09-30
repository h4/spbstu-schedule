var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');

var Schedule = React.createClass({
    componentDidMount: function() {
        var facultyId = this.props.params.facultyId;
        var groupId = this.props.params.groupId;

        this.props.dispatch(actions.fetchLessons(facultyId, groupId));
    },

    render: function() {
        var groupId = this.props.params.groupId;
        var lessons = this.props.lessons && this.props.lessons[groupId];

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
        isFetching: state.lessons.isFetching,
        faculties: state.faculties.data,
        lessons: state.lessons.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Schedule);
