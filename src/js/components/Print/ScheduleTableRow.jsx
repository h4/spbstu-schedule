var React = require('react');
var _ = require('lodash');
var Cell = require('./Cell.jsx');

var Time = React.createClass({
    render: function() {
        return <td className='time_td' rowSpan='2'>{this.props.value}</td>;
    }
})

function canMerge(a, b) {
    if(!a && !b) return true
    if(!a || !b) return false
    if(a.length != b.length) return false

    return _.isEqualWith(a, b, function(a_lessons, b_lessons) {
        return _.every(_.map(a_lessons, (xx, i) => _.isEqualWith(a_lessons[i], b_lessons[i], canMergeLesson)))
    })
}

function canMergeLesson(x, y) {
    return x.short_name === y.short_name && x.type === y.type &&
        _.isEqual(x.teachers, y.teachers) &&
        _.isEqual(x.auditories, y.auditories)
}

function mergeSubgroupsIfPossible(lessons) {
    if (lessons.length < 2) return lessons;

    var canMerge = _.every(lessons, a => {
        var b = lessons[0]
        return a.subject === b.subject && a.typeObj.name === b.typeObj.name
    })
    if (canMerge) {
        return [_.reduce(lessons, mergeSubgroups)]
    } else {
        return lessons
    }
}

function mergeSubgroups (a, b) {
    a.teachers = _.unionBy(a.teachers, b.teachers, 'id')
    a.auditories = _.unionBy(a.auditories, b.auditories, 'id')
    return a
}


function getRows(lessonsEven, lessonsOdd, time) {
    lessonsEven = lessonsEven || []
    lessonsOdd = lessonsOdd || []

    lessonsEven = _.groupBy(lessonsEven, 'weekday')
    lessonsOdd = _.groupBy(lessonsOdd, 'weekday')

    lessonsEven = _.mapValues(lessonsEven, x => mergeSubgroupsIfPossible(x))
    lessonsOdd = _.mapValues(lessonsOdd, x => mergeSubgroupsIfPossible(x))

    var even_cells = _.times(6, i => <Cell key={i} lessons={lessonsEven[i + 1]} merge={canMerge(lessonsEven[i + 1], lessonsOdd[i + 1])} />)
    var odd_cells = _.map(even_cells, (c, i) => {
        if (c.props.merge) {
            return null
        } else {
            return <Cell key={7 + i} lessons={lessonsOdd[i + 1]} odd />
        }
    })
    odd_cells = _.filter(odd_cells, _.isObject)
    
    var even_row = <tr key={time + 'even'}>
        <Time value={time} />
        <td className='week_td'>I</td>
        {even_cells}
    </tr>
    var odd_row = <tr key={time + 'odd'}>
        <td className='week_td odd_week'>II</td>
        {odd_cells}
    </tr>
    return [even_row, odd_row]
};

module.exports = getRows;