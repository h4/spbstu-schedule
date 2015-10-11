'use strict';

function getPrevWeekStart(week) {
    if (! week) {
        throw new Error('Argument week should be passed');
    }

    var dateArray = week.date_start.split('.');
    var prevWeekStartDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    prevWeekStartDate.setHours(-24 * 7);

    return prevWeekStartDate;
}

function getNextWeekStart(week) {
    if (! week) {
        throw new Error('Argument week should be passed');
    }

    var dateArray = week.date_end.split('.');
    var nextWeekStartDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    nextWeekStartDate.setHours(24);

    return nextWeekStartDate;
}

function dateToString(date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
}

function getPrevWeekStartString(week) {
    var prevWeekStartDate = getPrevWeekStart(week);

    return dateToString(prevWeekStartDate);
}

function getNextWeekStartString(week) {
    var nextWeekStartDate = getNextWeekStart(week);

    return dateToString(nextWeekStartDate);
}

module.exports = {
    getNextWeekStart: getNextWeekStart,
    getNextWeekStartString: getNextWeekStartString,
    getPrevWeekStart: getPrevWeekStart,
    getPrevWeekStartString: getPrevWeekStartString,
};
