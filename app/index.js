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

// Adding logger
if (app.get('env') === 'production') {
  // Production logger logs to a rotated file
  console.log(app.get('env'));
  app.use(logger('combined', {stream: accessLogStream}));
} else {
  // Development logger logs to console
  console.log(app.get('env'));
  app.use(logger('dev'));
}

// Setting default route for root
// Serving html, css and js files for website
app.use(express.static(path.join(__dirname, '../', 'public')));

// Setting app listen on port 3000
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
