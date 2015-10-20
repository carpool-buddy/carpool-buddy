require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');
var angular = window.angular;

var tripApp = angular.module('tripApp', ['ngRoute', 'base64', 'ngCookies']);

require('./services/services')(tripApp);
require('./trips/trips')(tripApp);
require('./users/users')(tripApp);
require('./logout')(tripApp);
require('./router')(tripApp);
