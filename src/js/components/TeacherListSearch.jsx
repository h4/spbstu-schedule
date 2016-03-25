var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/SearchActions');
var TeachersList = require('./Search/TeachersList.jsx');
var SearchInput = require('./Search/SearchInput.jsx');

var TeacherListSearch = React.createClass({
    componentWillMount: function () {
        if (! this.props.teachers) {
            this.props.dispatch(actions.fetchTeachersList());
        }
    },

    getInitialState: function() {
        return {filter: ''};
    },

    handleFilter: function(newFilter) {
        this.setState({filter: newFilter});
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

        if (! this.props.teachers) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        if (this.state.filter.length > 0) {
            let filter = this.state.filter.toLowerCase()
            teachers = teachers.filter(teacher =>
                // its very strange indeed, but first_name is actualy surname
                teacher.first_name.toLowerCase().indexOf(filter) == 0
            )
        }

        return (
            <div className="schedule-page">
                <SearchInput onChange={this.handleFilter} placeholder="Введите фамилию" />
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
        isFetching: state.search.isFetching,
        teachers: state.search.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(TeacherListSearch);
