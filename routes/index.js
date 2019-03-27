var express = require('express');
var router = express.Router();
var async = require('async');
var client = require('../dbconfig');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var query = "g.V().valueMap();";
  client.executeGraph(query).then((dseResult) => {
    res.render('index', { title: JSON.stringify(dseResult.toArray()) });
  }).catch((err) => {
    res.render('index', { title: 'Error in Fetching' });
  });
});

module.exports = router;
