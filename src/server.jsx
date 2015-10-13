var express = require('express');
var app = express();
var fs = require('fs');
var html = fs.readFileSync('./index.html');

app.use('/js', express.static('js'));
app.use('/css', express.static('css'));

app.use(function(req, res) {
    res.end(html);
});

module.exports = app;
