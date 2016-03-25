'use strict';
var React = require('react');
var Link = require('react-router').Link;
var SearchInput = require('./Search/SearchInput.jsx');

var Faculties = React.createClass({

    handleSearch: function(searchString) {
        if (searchString.length == 0) return;
        window.location.href = '/search/groups?q=' + encodeURIComponent(searchString)
    },

    render: function() {
        return (
            <div>
                <SearchInput placeholder="Введите номер группы" onSubmit={this.handleSearch} />
                <ul className="faculty-list__list">
                {this.props.faculties.map((faculty, i) =>
                    <li key={i} className="faculty-list__item">
                        <Link to={`/faculty/${faculty.id}/groups`} className="faculty-list__link">{faculty.name}</Link>
                    </li>
                )}
                </ul>
            </div>
        )
    }
});

module.exports = Faculties;
