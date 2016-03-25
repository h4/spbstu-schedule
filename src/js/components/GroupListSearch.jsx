var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/SearchActions');
var Link = require('react-router').Link;

var GroupListSearch = React.createClass({
    componentWillMount: function () {
        if (! this.props.groups) {
            this.props.dispatch(actions.fetchGroupsList(this.props.location.query.q));
        }
    },

    getInitialState: function() {
        return {filter: ''};
    },

    handleFilter: function(newFilter) {
        this.setState({filter: newFilter});
    },


    render: function() {
        let groups = this.props.groups;

        if (this.props.isFetching) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        if (!groups || groups.length === 0) {
            return (
                <div className="schedule-page">
                    <h2>Группы не найдены</h2>
                </div>
            )
        }

        return (
            <div className="schedule-page">
                <ul className="groups-list">
                    {groups.map((group) =>
                        <li key={group.id} className="groups-list__item">
                            <Link to={`/faculty/${group.faculty.id}/groups/${group.id}`}
                                className="groups-list__link">{group.name}</Link>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
});

GroupListSearch.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isFetching: state.searchGroup.isFetching,
        groups: state.searchGroup.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(GroupListSearch);
