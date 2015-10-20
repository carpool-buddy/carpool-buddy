require('../../app/js/client');

describe('resource service', function() {
  beforeEach(angular.mock.module('tripApp'));

  var ResourceService;
  var $httpBackend;
  var tripResource;
  beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
    ResourceService = Resource;
    $httpBackend = _$httpBackend_;
    tripsResource = ResourceService('trips');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get requets', function() {
    $httpBackend.expectGET('/api/trips').respond(200, [{tripName: 'test trip', _id: 1}]);
    tripsResource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
    });
    $httpBackend.flush();
  });
});
