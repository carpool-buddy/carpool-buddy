module.exports = function(tripApp) {
  tripApp.config(['$routeProvider', function($route) {
    $route
      .when('/trip', {
        templateUrl: '/templates/trips/views/trip_view.html'
      })
      .when('/signup', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SignupController'
      })
      .when('/signin', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SigninController'
      })
      .otherwise({
        redirectTo: '/signup'
      });
  }]);
};
