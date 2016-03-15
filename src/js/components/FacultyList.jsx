var React = require('react');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');
var Faculties = require('./Faculties.jsx');
var TabbedArea = require('./Common/Tabs.jsx').TabbedArea;
var TabPane = require('./Common/Tabs.jsx').TabPane;

var FacultyList = React.createClass({
    componentWillMount: function() {
        if (! this.props.faculties) {
            this.props.dispatch(actions.fetchFaculties());
        }
    },

    render: function() {
        if (this.props.isFetching) {
            return (
                <div className="faculty-list">Данные загружаются...</div>
            )
        }

        return (
            <div>{
                this.props.faculties &&
                <div className="faculty-list">
                    <TabbedArea>
                        <TabPane display='Очное'>
                            <Faculties faculties={this.props.faculties} groupType='common' />
                        </TabPane>
                        <TabPane display='Очно-заочное'>
                            <Faculties faculties={this.props.faculties} groupType='evening' />
                        </TabPane>
                        <TabPane display='Заочное'>
                            <Faculties faculties={this.props.faculties} groupType='distance' />
                        </TabPane>
                    </TabbedArea>
                </div>
            }</div>
        )
    }
});

FacultyList.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.faculties.isFetching,
        faculties: state.faculties.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(FacultyList);
