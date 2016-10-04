var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var connection = require('../db/dbConnection');

var app = express();

// Create parsers
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the basic get route
router.get('/', function(req, res) {
  connection.query('SELECT * FROM cardb.companies',
    function(err, rows, fields) {
      if (err) {
        throw err;
      } else {
        res.send(rows);
      }
    });
});

// define route to get single item by id
router.get('/:ID', function(req, res) {
  var params = req.params;
  console.log(params);
  connection.query('SELECT * FROM cardb.companies WHERE ID = ?',
    params.ID,
    function(err, rows, fields) {
      if (err) {
        throw err;
      } else {
        res.send(rows);
      }
    });
});

// define the create new company route
router.post('/create', jsonParser, function(req, res) {
  if (!req.body) {
    // No body in request, returning 400 status code
    return res.sendStatus(400);
  }
  var company = req.body;
  if (company.hasOwnProperty('Name') &&
    company.hasOwnProperty('Established') &&
    Object.keys(company).length === 2) {
    // request body has all necessary values
    var query = connection.query(`INSERT INTO cardb.companies SET ?`,
      company,
      function(err, result) {
        if (err) {
          throw err;
        } else {
          connection.query('SELECT * FROM cardb.companies WHERE ID = ?',
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
