var express = require('express');
var path = require('path');
const EventEmitter = require('events');




var app = express();

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
