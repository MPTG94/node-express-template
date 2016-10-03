var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('GET All Cars');
});
// define the about route
router.post('/', function(req, res) {
  res.send('POST All Cars');
});

module.exports = router;
