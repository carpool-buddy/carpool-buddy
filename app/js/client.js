require('angular/angular');
var angular = window.angular;
require('angular-route');
require('angular-base64');
require('angular-cookies');

var carpoolApp = angular.module('carpoolApp', ['ngRoute', 'base64']);

require('./users/entry')(carpoolApp);
require('./trips/entry')(carpoolApp);

//require('./router')(carpoolApp);
console.log('angular loaded');
