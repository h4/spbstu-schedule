var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/SearchActions');
var TeachersList = require('./Search/TeachersList.jsx');
var SearchInput = require('./Search/SearchInput.jsx');

var TeacherListSearch = React.createClass({
    componentWillMount: function () {
        if (! this.props.teachers) {
            this.props.dispatch(actions.searchTeachers(this.props.location.query.q));
        }
    },

    render: function() {
        let teachers = this.props.teachers;

        if (this.props.isFetching) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        if (!teachers || teachers.length === 0) {
            return (
                <div className="schedule-page">
                    <h3>Преподаватели не найдены</h3>
                </div>
            )
        }

        return (
            <div className="schedule-page">
                <TeachersList teachers={teachers} />
            </div>
        )
    }
});

TeacherListSearch.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isFetching: state.searchTeacher.isFetching,
        teachers: state.searchTeacher.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(TeacherListSearch);
