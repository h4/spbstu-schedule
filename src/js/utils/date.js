'use strict';

function getNextWeekStart(week) {
    if (! week) {
        throw new Error('Argument week should be passed');
    }

    var dateArray = week.date_end.split('.');
    var nextWeekStartDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    nextWeekStartDate.setHours(24);

    return nextWeekStartDate;
}

function getNextWeekStartString(week) {
    var nextWeekStartDate = getNextWeekStart(week);

    return [nextWeekStartDate.getFullYear(), nextWeekStartDate.getMonth() + 1, nextWeekStartDate.getDate()].join('-');
}

module.exports = {
    getNextWeekStart: getNextWeekStart,
    getNextWeekStartString: getNextWeekStartString
};
