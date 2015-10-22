var express = require('express');
var Trip = require(__dirname + "/../models/trip");
var User = require(__dirname + "/../models/user");
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var dateParser = require(__dirname + '/../lib/date_parser');
var findDistance = require(__dirname + '/../app/js/find_distance');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var tripsRoute = module.exports = exports = express.Router();

tripsRoute.get('/trips', jsonParser, eatAuth, function(req, res) {
  // If there is only a userId we are finding all the trips the user is a part of.  
  
  Trip.find({travelers: req.user._id}, function(err, docs) {
    
    if (err) handleError(err, res, 500);
    res.json({trips: docs});
  });
});

tripsRoute.get('/trips/:tripSearch', jsonParser, eatAuth, function(req, res) {
  // if there is a tripSearch object on req.query, then we are finding trips
  // for the user to sign up to.
  if (req.params.tripSearch) {
    var search = JSON.parse(req.params.tripSearch);
    // 30 mins less than search time
    var leastTimeOrigin = dateParser(search.originTime) - (1000 * 60 * 30);
    // 30 mins more than search time
    var mostTimeOrigin = dateParser(search.originTime) + (1000 * 60 * 30);
    var leastTimeDest = dateParser(search.destTime) - (1000 * 60 * 30);
    var mostTimeDest = dateParser(search.destTime) + (1000 * 60 * 30);
    // TODO add day of week support and origin/dest support
    Trip.find({$and: [{$and: [{"originTime": {$gt: leastTimeOrigin}},
                              {"originTime": {$lt: mostTimeOrigin}}
                      ]},
                      {$and: [{"destTime": {$gt: leastTimeDest}},
                              {"destTime": {$lt: mostTimeDest}}
                      ]}
              ]},
    function(err, docs) {
      if (err) handleError(err, res, 500);
      destMatch = [];
      docs.forEach(function(doc, index, array) {
        findDistance(search.origin, doc.origin, function(distance) {
          if(distance < 5) {
            findDistance(search.dest, doc.dest, function(distance) {
              if(distance < 5) {
                destMatch.push(doc);
                if (index === array.length -1) {
                  res.json({trips: destMatch});
                }
              }
            });
          }
        });
      });
    });
  }
});

tripsRoute.post('/trips', jsonParser, eatAuth, function(req, res) {
  var tripInfo = req.body.trip;
  User.findOne({_id: req.user._id}, function(err, user) {
    var trip = new Trip();
    trip.tripName = tripInfo.tripName;
    trip.origin = tripInfo.origin;
    trip.originTime = dateParser(tripInfo.originTime);
    trip.dest = tripInfo.dest;
    trip.destTime = dateParser(tripInfo.destTime);
    trip.weekDays = tripInfo.weekDays;
    trip.travelers = [user._id];
    trip.seatsLeft = user.carSeats -1;
    trip.save(function(err, data) {
      if (err) handleError(err, res, 500);
      res.send(data);
    });
  });
});

tripsRoute.put('/trips', jsonParser, eatAuth, function(req, res) {
  var config = req.body.tripConfig;
  User.findOne({_id: req.user._id}, function(err, user) {
    if (err) handleError(err, res, 500);
    if(config.remove === 'true') {
      User.update({_id: user._id}, {$pull: {trips: config.tripId}}, function() {
        Trip.update({_id: config.tripId}, {$pull: {travelers: user._id}}, function() {
          res.send({msg: 'success'});
        });
      });
      return;
    }
    User.update({_id: user._id}, {$push: {trips: config.tripId}}, function() {
      Trip.update({_id: config.tripId}, {$push: {travelers: user._id}}, function() {
        res.send({msg: 'success'});
      });
    });
  });
});

tripsRoute.delete('/trips', jsonParser, eatAuth, function(req, res) {
  Trip.remove({_id: req.body.tripId}, function(err) {
    if (err) return handleError(err, res, 500);
    res.json({msg: 'success'});
  });
});