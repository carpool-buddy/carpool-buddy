var express = require('express');
var Trip = require(__dirname + "/../models/trip");
var User = require(__dirname + "/../models/user");
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var dateParser = require(__dirname + '/../lib/date_parser');

var tripsRoute = module.exports = exports = express.Router();

tripsRoute.get('/trips', jsonParser, function(req, res) {
  // if there is a tripSearch object on req.body, then we are finding trips
  // for the user to sign up to.
  if (req.body.tripSearch) {
    var search = req.body.tripSearch;
    // 30 mins less than search time
    var leastTimeOrigin = dateParser(search.originTime) - (1000 * 60 * 30);
    // 30 mins more than search time
    var mostTimeOrigin = dateParser(search.originTime) + (1000 * 60 * 30);
    var leastTimeDest = dateParser(search.destTime) - (1000 * 60 * 30);
    var mostTimeDest = dateParser(search.destTime) + (1000 * 60 * 30);
    // TODO add day of week support and origin/dest support
    Trip.find({$and: [{"origin": search.origin}, {"dest": search.dest},
                      {$and: [{"originTime": {$gt: leastTimeOrigin}},
                              {"originTime": {$lt: mostTimeOrigin}}
                      ]},
                      {$and: [{"destTime": {$gt: leastTimeDest}},
                              {"destTime": {$lt: mostTimeDest}}
                      ]}
              ]}, function(err, docs) {
      if (err) handleError(err, res);
      res.json({trips: docs});
    });
  }
  // Otherwise we are finding all the trips the user is a part of.
  User.findOne({email: req.body.userEmail}, function(err, user) {
    if (err) handleError(err);
    Trip.find({travelers: user._id}, function(err, docs) {
      if (err) handleError(err);
      res.json({trips: docs});
    });
  });
});