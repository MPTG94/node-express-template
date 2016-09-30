'use strict';
// Adding NodeJS modules
var fileStreamRotator = require('file-stream-rotator');
var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');

// Initialize express
var app = express();
var logDirectory = path.join(__dirname, '../', 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = fileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

// Adding logger for development
// setup the logger
if (app.get('env') === 'production') {
  app.use(logger('combined', {stream: accessLogStream}));
} else {
  app.use(logger('dev'));
}

// Setting default route for root
// Serving index.html for root request
app.use(express.static(path.join(__dirname, '../', 'public/html')));

// Setting app listen on port 3000
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
