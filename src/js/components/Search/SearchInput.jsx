var React = require('react');
var _ = require('lodash');

var SearchInput = React.createClass({
    propTypes: {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onSubmit: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            onChange: newFilter => null,
            onSubmit: newFilter => null,
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
    handleSubmit: function(e) {
        this.props.onSubmit(this.state.value)
        e.preventDefault()
    },

    render: function() {
        return (
            <form className='search-input' onSubmit={this.handleSubmit}>
                <span className="icon"><i className="fa fa-search"></i></span>
                <span className="field">
                    <input type="text"
                           value={this.state.value}
                           onChange={this.handleInput}
                           placeholder={this.props.placeholder}
                    />
                </span>
            </form>
        )
    }
});

module.exports = SearchInput
