var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');
var Groups = require('./Groups.jsx');

var Faculty = React.createClass({
    componentWillMount: function () {
        var id = this.props.params.facultyId;

        if (!this.props.faculties) {
            this.props.dispatch(actions.fetchFaculties());
        }

        this.props.dispatch(actions.fetchGroups(id));
    },

    componentDidMount: function () {
        var id = this.props.params.facultyId;

        this.props.dispatch(actions.fetchGroups(id));
    },

    getGroupPart: function (group, part) {
        return parseInt(group.name.split('/')[ part ]);
    },

    getGroupNum: function (group) {
        return this.getGroupPart(group, 0);
    },

    getSubgroupNum: function (group) {
        return this.getGroupPart(group, 1);
    },

    render: function () {
        var facultyId = parseInt(this.props.params.facultyId, 10);
        var faculty = _.find(this.props.faculties, 'id', facultyId);
        var groups = this.props.groups && this.props.groups[ facultyId ];
        var levels = groups && _.chain(groups)
                .sortBy('level')
                .sortByOrder([ this.getGroupNum, this.getSubgroupNum ])
                .groupBy('level')
                .value();

        if (this.props.isFetching && faculty) {
            return (
                <div>
                    <h2>{faculty.name}</h2>
                    <div>Loading...</div>
                </div>
            )
        }

        if (!faculty) {
            return (
                <div>
                    <div>Loading...</div>
                </div>
            )
        }

        return (
            <div>
                <h2>{faculty.name}</h2>
                {
                    levels &&
                    <div className="groups-list">
                        {
                            Object.keys(levels)
                                .map(function(level, i) {
                                return (
                                <div key={i}>
                                    <h3>{level} курс</h3>
                                    <Groups groups={levels[level]} facultyId={facultyId}/>
                                </div>
                                    );
                                }
                                )
                            }
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
