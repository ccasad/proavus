var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Person = require('../models/Person.js');

/* GET persons listing. */
router.get('/', function(req, res, next) {
  Person.find(function (err, persons) {
  	if (err) {
  		return next(err);
  	}
  	res.json(persons);
  })
});

/* GET /persons/id */
router.get('/:id', function(req, res, next) {
  Person.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /persons */
router.post('/', function(req, res, next) {
	Person.create(req.body, function (err, post) {
		if (err) {
			return next(err);
		}
		res.json(post);
	})
});

/* PUT /persons/:id */
router.put('/:id', function(req, res, next) {
  Person.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /persons/:id */
router.delete('/:id', function(req, res, next) {
  Person.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
