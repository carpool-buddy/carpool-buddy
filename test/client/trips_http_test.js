require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('trips controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('tripApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = new $ControllerConstructor('tripsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.trips)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('tripController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request when getAll() is called', function() {
      $httpBackend.expectGET('/api/trips').respond(200, [{tripName: 'test trip'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.trips[0].tripName).toBe('test trip');
    });

    it('should be able to create a trip', function() {
      $httpBackend.expectPOST('/api/trips', {tripName: 'send test trip'}).respond(200, {_id: 1, tripName: 'test trip'});
      $scope.newTrip = {tripName: 'hello'};
      $scope.createTrip({tripName: 'send test trip'});
      $httpBackend.flush();
      expect($scope.trips[0].tripName).toBe('test trip');
      expect($scope.newTrip).toEqual({});
    });

    it('should be able to update a trip', function() {
      var trip = {tripName: 'test trip', _id: 1, editing: true};
      $httpBackend.expectPUT('/api/trips/1', trip).respond(200);
      $scope.updateTrip(trip);
      $httpBackend.flush();
      expect(trip.editing).toBe(false);
    });

    it('should be able to delete a trip', function() {
      var trip = {tripName: 'test trip', _id: 1};
      $scope.trips = [trip];
      $httpBackend.expectDELETE('/api/trips/1').respond(200);
      $scope.removeTrip(trip);
      $httpBackend.flush();
      expect($scope.trips.length).toBe(0);
      expect($scope.trips.indexOf(trip)).toBe(-1);
    });
  });
});
