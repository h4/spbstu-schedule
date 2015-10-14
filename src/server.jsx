var express = require('express');
var app = express();
var fs = require('fs');
var html = fs.readFileSync('./index.html');

app.use('/assets', express.static('assets'));
app.use('/img', express.static('img'));

app.use(function(req, res) {
    res.end(html);
});

module.exports = app;
