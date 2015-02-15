var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Family = require('../models/Family.js');

/* GET families listing. */
router.get('/', function(req, res, next) {
  Family.find(function (err, families) {
  	if (err) {
  		return next(err);
  	}
  	res.json(families);
  })
});

/* GET /families/id */
router.get('/:id', function(req, res, next) {
  Family.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /families */
router.post('/', function(req, res, next) {
	Family.create(req.body, function (err, post) {
		if (err) {
			return next(err);
		}
		res.json(post);
	})
});

/* PUT /families/:id */
router.put('/:id', function(req, res, next) {
  Family.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /families/:id */
router.delete('/:id', function(req, res, next) {
  Family.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
