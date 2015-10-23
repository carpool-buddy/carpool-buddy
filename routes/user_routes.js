var express = require('express');
var jsonParser = require('body-parser').json();

var httpBasic = require(__dirname + '/../lib/http_basic');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var User = require(__dirname + '/../models/user');
var userEvents = require(__dirname + '/../events/user_events');

var userRoutes = module.exports = exports = express.Router();

userRoutes.post('/signup', jsonParser, function(req, res) {
  userEvents.emit('create_new_user', req, res);
});

userRoutes.get('/signin', httpBasic, function(req, res) {
  userEvents.emit('log_in_user', req, res);
});
