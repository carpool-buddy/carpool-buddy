module.exports = function(app) {
  app.controller('TripsController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {

    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');

    $http.defaults.headers.common.token = eat;
    $scope.trips = [];
    $scope.allTrips = [];
    $scope.tripSearchResults = [];
    $scope.newTrip = {};

    $scope.getMyTrips = function() {
      $http.get('/api/trips')
        .then(function(res) {
          $scope.trips = res.data.trips;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.getAllTrips = function() {
      $http.get('/api/allTrips')
        .then(function(res) {
          $scope.allTrips = res.data.trips;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.refresh = function() {
      $scope.getMyTrips();
      $scope.getAllTrips();
    }

    $scope.findTrip = function(tripSearchObj) {
      console.log(tripSearchObj);
      var search = JSON.stringify(tripSearchObj);
      $http.get('/api/trips/' + search)
        .then(function(res) {
          $scope.tripSearchResults = res.data.trips;
          console.log(res.data.trips);
        }, function(res) {
          console.log(res);
        });
    };

    $scope.createTrip = function(trip) {
      $http.post('/api/trips', {newTrip: trip})
        .then(function(res) {
          $scope.newTrip = {};
          $scope.trips.push(res.data);
          $scope.refresh;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.tripSubsciption = function(trip, remove) {
      var tripConfig = {"remove": remove, "tripId": trip._id};
      $http.put('/api/trips', {tripConfig: tripConfig})
        .then(function(res) {
          if (tripConfig.remove === "true") {
            return $scope.trips.splice($scope.trips.indexOf(trip), 1);
          }
          trip.travelers.push(res.data.userId);
          $scope.trips.push(trip);
        }, function(res) {
          console.log(res);
        });
    };

    $scope.removeTrip = function(trip) {
      $http.delete('/api/trips/' + trip._id)
        .then(function(res) {
          $scope.getAllTrips();
          $scope.trips.splice($scope.trips.indexOf(trip), 1);
        }, function(res) {
          console.log(res);
        });
    };
  }]);
};
