var EventEmitter = require('events').EventEmitter;

var handleError = require(__dirname + '/../lib/handle_error');
var User = require(__dirname + '/../models/user');

var userEvents = new EventEmitter();

userEvents.on('create_new_user', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if(user) {
      return res.status(409).json({msg: "A user has already signed up with that email."});
    }

    var newUser = new User();
    newUser.email = newUser.basic.email = req.body.email;
    newUser.name = req.body.name || '';
    newUser.carSeats = req.body.carSeats;

    userEvents.emit('validated_new_user', req, res, newUser);
  });
});

userEvents.on('validated_new_user', function(req, res, user) {
  user.generateHash(req.body.password, function(err, hash) {
    if(err) {
      return handleError(err, res, 500);
    }

    user.save(function(err, data) {
      if(err) {
        return handleError(err, res, 500);
      }

      userEvents.emit('user_signed_in', req, res, user);
    });
  });
});

userEvents.on('user_signed_in', function(req, res, user) {
  user.generateToken(function(err, token) {
    if(err) {
      return handleError(err, res, 500);
    }

    res.json({token: token});
  });
});

userEvents.on('log_in_user', function(req, res) {
  User.findOne({'basic.email': req.auth.email}, function(err, user) {
    if(err) {
      return handleError(err, res, 500);
    }

    if(!user) {
      console.log("Could not authenticate: " + req.auth.email);
      return handleError(null, res, 401);
    }

    user.compareHash(req.auth.password, function(err, hashResponse) {
      if(err) {
        return handleError(err, res, 500);
      }

      if(!hashResponse) {
        console.log("Could not authenticate: " + req.auth.email);
        return handleError(null, res, 401);
      }

      userEvents.emit('user_signed_in', req, res, user);
    });
  });
});

module.exports = userEvents;
