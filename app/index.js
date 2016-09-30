'use strict';
// Adding express module
var express = require('express');
var app = express();

// Setting default route for root
app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Setting app listen on port 3000
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
