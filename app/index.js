'use strict';
// Adding NodeJS modules
var fileStreamRotator = require('file-stream-rotator');
var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var mysql = require('mysql');

// Adding routers
var cars = require('./api/cars');
var companies = require('./api/companies');

// Setup MySQL connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1',
  database: 'cardb'
});

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

// Connecting to MySQL instance
connection.connect(function(err) {
  if (err) {
    console.log("There was an error connecting to the DB:" + err);
  } else {
    console.log("Successfuly connected to DB, Connection ID:" +
      connection.threadId);
  }
});

// Setting default route for root
// Serving html, css and js files for website
app.use(express.static(path.join(__dirname, '../', 'public')));

// Setting API routes
app.use('/api/cars', cars);
app.use('/api/companies', companies);

// Setting app listen on port 3000
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
