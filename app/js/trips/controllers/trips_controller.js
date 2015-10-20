module.exports = function(app) {
  app.controller('tripsController', ['$scope', 'Resource', '$http', '$cookies', '$location', function($scope, Resource, $http, $cookies, $location) {

    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');

    $http.defaults.headers.common.token = eat;
    $scope.trips = [];
    $scope.newTrip = {};
    var tripResource = Resource('trips');
    $scope.description= 'this is our app, there are many like it but this one is ours';

    $scope.printDescription = function(description) {
      console.log('from the function: ' + description);
      console.log('from $scope: ' + $scope.description);
    };

    $scope.getAll = function() {
      tripResource.getAll(function(err, data) {
        if (err) return console.log(err);
        $scope.trips = data;
      });
    };

    $scope.createTrip = function(trip) {
      tripResource.create(trip, function(err, data) {
        if(err) return console.log(err);
        $scope.newTrip = {};
        $scope.trips.push(data);
      });
    };

    $scope.saveTrip = function(trip) {
      trip.editing = false;
      trip.save(trip, function(err, data) {
      });
    };

    $scope.editCancel = function(trip) {
      if(trip.editing) {
        trip.tripName = trip.temp;
        trip.temp = undefined;
        trip.editing = false;
      } else {
        trip.temp = trip.tripName;
        trip.editing = true;
      }
    };

    $scope.removeTrip = function(trip) {
      tripResource.remove(trip, function(err) {
        if (err) return console.log(err);
        $scope.trips.splice($scope.trips.indexOf(trip), 1);
      });
    };
  }]);
};
