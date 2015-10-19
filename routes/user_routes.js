var express = require('express');
var User = require(__dirname + "/../models/user");
var jsonParser = require('body-parser').json();

var userRoute = module.exports = exports = express.Router();