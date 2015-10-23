require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('trips controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('carpoolApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = new $ControllerConstructor('TripsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.trips)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('TripsController', {$scope: $scope});
    }));


    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to make a get request to get users trips', function() {
      $httpBackend.expectGET('/api/trips').respond(200, {trips: [{"origin": "WA"}]});
      $scope.getMyTrips();
      $httpBackend.flush();
      expect($scope.trips[0].origin).toBe('WA');
    });

    it('should be able to make a get request to search for new trips', function() {
      var search = {"origin": "map coordinates", "originTime": "08:00 AM",
                    "dest": "map coordinates", "destTime": "10:00 PM",
                    "weekDays": "mon, tue, thu"};
      $httpBackend.expectGET('/api/trips/' + JSON.stringify(search)).respond(200, {trips: [{"origin": "success"}]});
      $scope.findTrip(search);
      $httpBackend.flush();
      expect($scope.tripSearchResults[0].origin).toBe('success');
    });

    it('should be able to create a trip', function() {
      var newTrip = {"tripName": "to work", "origin":"address", "originTime":"08:00 AM", "dest":"map coordinates",
                     "destTime": "10:00 AM", "weekDays":"mon, tue, thu, sat"};
      $httpBackend.expectPOST('/api/trips', {newTrip: newTrip}).respond(200, {_id: 1, tripName: "success"});
      $scope.newTrip = {tripName: 'newTrip'};
      $scope.createTrip(newTrip);
      $httpBackend.flush();
      expect($scope.trips[0].tripName).toBe('success');
    });

    it('should be able to unsubscribe a user from a trip', function() {
      var trip = {"tripName": "test", "_id": 1};
      $scope.trips = [trip];
      $httpBackend.expectPUT('/api/trips', {tripConfig: {"remove": "true", "tripId": 1}}).respond(200, {msg: "success"});
      $scope.tripSubsciption(trip, "true");
      $httpBackend.flush();
      expect($scope.trips.indexOf({"tripName": "test", _id: 1})).toBe(-1);
    });

    it('should subscribe a user to a trip', function() {
      var trip = {"tripName": "test", "_id": 1, "travelers": []};
      $httpBackend.expectPUT('/api/trips', {tripConfig: {"remove": "false", "tripId": 1}}).respond(200, {userId: 4});
      $scope.tripSubscription(trip, "false");
      $httpBackend.flush();
      expect($scope.trips[0].travelers[0]).toBe(4);
    });

    it('should make a delete request', function() {
      var trip = {"tripName": "test", "_id": 1};
      $scope.trips = [trip];
      $httpBackend.expectDELETE('/api/trips/' + trip._id).respond(200, {msg: "success"});
      $httpBackend.expectGET('/api/allTrips').respond(200, {});
      $scope.removeTrip(trip);
      $httpBackend.flush();
      expect($scope.trips.indexOf(trip)).toBe(-1);
    });
  });
});
