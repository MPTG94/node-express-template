var express = require('express');
var router = express.Router();
var connection = require('../db/dbConnection');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  connection.query('SELECT * FROM cardb.cars', function(err, rows, fields) {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

// define the about route
router.post('/', function(req, res) {
  res.send('POST All Companies');
});

module.exports = router;
