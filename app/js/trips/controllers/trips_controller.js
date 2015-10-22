module.exports = function(app) {
  app.controller('TripsController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {

    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');

    $http.defaults.headers.common.token = eat;
    $scope.trips = [];
    $scope.newTrip = {};

    $scope.getMyTrips = function() {
      $http.get('/api/trips')
        .then(function(res) {
          $scope.trips = res.data;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.createTrip = function(trip) {
      $http.post('/api/trips', trip)
        .then(function(res) {
          $scope.newTrip = {};
          $scope.trips.push(res.data);
        }, function(res) {
          console.log(res);
        });
    };

  }]);
};