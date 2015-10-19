var React = require('react');
var _ = require('lodash');
var dateUtils = require('../utils/date');
var reactRedux = require('react-redux');
var Link = require('react-router').Link;
var actions = require('../actions/PlaceActions');
var Day = require('./Schedule/Day.jsx');

var Place = React.createClass({
    componentWillMount: function () {
        var placeId = this.props.params.placeId;
        var buildingId = this.props.params.buildingId;

        this.date = this.props.query && this.props.query.date;

        this.props.dispatch(actions.fetchPlace(buildingId, placeId, this.date));
    },

    componentDidUpdate: function() {
        var placeId = this.props.params.placeId;
        var buildingId = this.props.params.buildingId;
        var date = this.props.query && this.props.query.date;

        if (this.date !== date) {
            this.date = date;
            this.props.dispatch(actions.fetchPlace(buildingId, placeId, this.date));
        }
    },

    render: function() {
        var placeId = parseInt(this.props.params.placeId, 10);
        var buildingId = parseInt(this.props.params.buildingId, 10);
        var lessons = this.props.lessons && this.props.lessons[placeId];
        var place = this.props.place;
        var week = this.props.week;
        var nextDate = week && dateUtils.getNextWeekStartString(week);
        var prevDate = week && dateUtils.getPrevWeekStartString(week);

        if (this.props.isFetching) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        if (! place) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        return (
            <div className="schedule-page">
                <h2 className="page__h2">
                    {place.building && <span>{place.building.name}, {place.building.address} </span> }
                    {place.name && <span>ауд. {place.name}</span> }
                </h2>
                <div className="switcher">
                    <div className="switcher__item">{nextDate && <Link to={`/places/${buildingId}/${placeId}?date=${prevDate}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Предыдущая неделя</Link>}</div>
                    <div className="switcher__item">{nextDate && <Link to={`/places/${buildingId}/${placeId}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Текущая неделя</Link>}</div>
                    <div className="switcher__item">{nextDate && <Link to={`/places/${buildingId}/${placeId}?date=${nextDate}` }
                                                                     className="switcher__link"
                                                                     activeClassName="switcher__link_active">Следующая неделя</Link>}</div>
                </div>
                {
                lessons &&
                <ul className="schedule">
                    {lessons.map((day, i) =>
                        <Day key={i} date={day.date} lessons={day.lessons} />
                    )}
                </ul>
                }
                <div className="switcher">
                    <div className="switcher__item">{nextDate && <Link to={`/places/${buildingId}/${placeId}?date=${prevDate}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Предыдущая неделя</Link>}</div>
                    <div className="switcher__item">{nextDate && <Link to={`/places/${buildingId}/${placeId}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Текущая неделя</Link>}</div>
                    <div className="switcher__item">{nextDate && <Link to={`/places/${buildingId}/${placeId}?date=${nextDate}` }
                                                                       className="switcher__link"
                                                                       activeClassName="switcher__link_active">Следующая неделя</Link>}</div>
                </div>
            </div>
        )
    }
});

Place.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.places.isFetching,
        place: state.places.place,
        lessons: state.places.data,
        week: state.places.week
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Place);
