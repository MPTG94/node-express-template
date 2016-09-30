'use strict';
// Adding express module
var express = require('express');
var path = require('path');
var app = express();
// Setting var for html files path
var htmlDir = './app/html/';

// Setting default route for root
// Serving index.html for root request
app.use(express.static(path.join(__dirname, '/html')));
app.get('/', function(req, res) {
  res.sendFile(htmlDir + 'index.html');
});

// Setting app listen on port 3000
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
