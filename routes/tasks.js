var express = require('express');
var router = express.Router();
var Task = require('../models/task');


router.get('/', function(req, res) {
  Task.find( function(err, tasks) {
    res.json(tasks);
  });
});

router.post('/', function(req, res) {
  new Task({
    title: req.body.title
  }).save( function(err, task) {
    res.json(task);
  });
});

router.delete('/', function(req, res) {
  Task.find({
    _id: req.body.id
  }).remove(function(err, item) {
    res.json(item);
  });
});


module.exports = router;
