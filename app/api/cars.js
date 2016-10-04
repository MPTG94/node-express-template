var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var connection = require('../db/dbConnection');

// Create parsers
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the basic get route
router.get('/', function(req, res) {
  connection.query('SELECT * FROM cardb.cars', function(err, rows, fields) {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

// define the create new car route
router.post('/create', jsonParser, function(req, res) {
  if (!req.body) {
    // No body in request, returning 400 status code
    return res.sendStatus(400);
  }
  var car = req.body;
  if (car.hasOwnProperty('Name') && car.hasOwnProperty('Trim') &&
    car.hasOwnProperty('HorsePower') && car.hasOwnProperty('CompanyID') &&
    Object.keys(car).length === 4) {
    // request body has all necessary values
    var query = connection.query(`INSERT INTO cardb.cars SET ?`, car,
      function(err, result) {
        if (err) {
          throw err;
        } else {
          connection.query('SELECT * FROM cardb.cars WHERE ID = ?',
            result.insertId,
            function(err, rows, fields) {
              if (err) {
                throw err;
              } else {
                res.send(rows);
              }
            });
        }
      });
  } else {
    // The input object either doesn't have all the necessary keys
    // or it has more keys than required
    return res.sendStatus(400);
  }
  // console.log(query.sql);
});

module.exports = router;
