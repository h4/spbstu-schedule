'use strict';
var React = require('react');

/*
    Common tabs control
    Usage example:

    <TabbedArea>
        <TabPane display="Tab 1">
            <div>This is the contents of Tab 1.</div>
        </TabPane>
        <TabPane display="Tab 2">
            <div>Contents of Tab 2.</div>
        </TabPane>
        <TabPane display="Tab 3">
            <div>Tab 3 Contents.</div>
        </TabPane>
    </TabbedArea>
*/

var TabbedArea = React.createClass({
    getInitialState: function () {
        return {
            activeIndex: this.props.activeIndex || 0
        };
    },

    render: function () {
        var self = this;
        var tabNodes = this.props.children.map(function (child, index) {
            var className = '';
            if(self.state.activeIndex === index) {
                className = 'active';
            }
            return (
                <li onClick={self._handleClick.bind(null, index)} key={child.props.display}>
                    <a className={className} href="#">{child.props.display}</a>
                </li>
            );
        });

        var contentNodes = this.props.children.map(function (child, index) {
            if(self.state.activeIndex === index) {
                return (
                    <div className="tabbed-area__pane">
                        {child.props.children}
                    </div>
                );
            }
        });

        return (
            <div className="tabbed-area">
                <ul className="tabbed-area__tabs">
                    {tabNodes}
                </ul>
                <section>
                    {contentNodes}
                </section>
            </div>
        );
    },

    _handleClick: function (index) {
        this.setState({
            activeIndex: index
        });
    }
});

var TabPane = React.createClass({
    render: function () {
        var active = this.props.active || false;
        if (active) {
            return this.props.children;
        } else {
            return null;
        }
    }
});

module.exports = {TabbedArea: TabbedArea, TabPane: TabPane};
