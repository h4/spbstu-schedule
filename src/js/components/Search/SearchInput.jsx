var React = require('react');
var _ = require('lodash');

var SearchInput = React.createClass({
    propTypes: {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            placeholder: ''
        }
    },

    getInitialState: function() {
        return {value: ''};
    },

    handleInput: function(e) {
        const text = e.target.value
        this.setState({value: text})
        this.props.onChange(text)
    },

    render: function() {
        return (
            <div className='search-input'>
                <span className="icon"><i className="fa fa-search"></i></span>
                <span className="field">
                    <input type="text" value={this.state.value} onChange={this.handleInput} placeholder={this.props.placeholder} />
                </span>
            </div>
        )
    }
});

module.exports = SearchInput
