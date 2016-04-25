var _ = require('lodash');
var ical = require('ical-generator')
var moment = require('moment');

function generateCal(req, res, store) {
    var cal = getCal(req, store)
    cal.serve(res)
}

function getCal(req, store) {
    var lessons = getLessons(store.getState())
    var events = _.map(lessons, l => lessonEvent(l))
    return ical({
        domain: req.get('host'),
        name: 'Расписание учебных занятий',
        prodId: {company: 'spbstu.ru', product: 'ical', language: 'RU'},
        timezone: 'Europe/Moscow',
        url: req.protocol + '://' + req.get('host') + req.url,
        ttl: 60 * 60 * 24 * 7,
        events: events
    })
}

function getLessons(state) {
    var groupId = _.get(state, ['lessons', 'group', 'id'])
    if(!groupId) return [];
    var week = _.get(state, ['lessons', 'week', 'date_start'])
    if(!week) return [];
    var data = _.get(state, ['lessons', 'data', groupId])
    if(!data || data.length == 0) return [];
    
    var lessons = _.flatMap(data, day =>
        _.map(day.lessons, lesson => {lesson.weekday = day.weekday; lesson.week = week; return lesson} )
    )
    lessons = _.sortBy(lessons, ['weekday', 'time_start'])
    return lessons
}

function lessonEvent(lesson) {
    return {
        start: dateFor(lesson, lesson.time_start),
        end: dateFor(lesson, lesson.time_end),
        summary: lesson.subject,
        description: '',
        location: placeName(lesson.auditories[0])
    }
}

function placeName(place) {
    if(!place) return '';
    var building = place.building.abbr || ''
    return building + ' ' + place.name
}


function dateFor(lesson, time) {
    var time = moment(time, 'HH:mm')
    return moment(lesson.week, 'YYYY.MM.DD')
        .day(lesson.weekday)
        .hour(time.hour())
        .minutes(time.minutes())
        .toDate()
}

module.exports = generateCal