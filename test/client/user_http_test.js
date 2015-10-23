require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('users controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;
  var $window;
  
  beforeEach(angular.mock.module(function($provide) {
    $window = {
      location: {
        assign: function(page) {
          this.path = page;
        }
      },
      document: window.document
    };

    $provide.constant('$window', $window);
  }));

  beforeEach(angular.mock.module('carpoolApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a signup controller', function() {
    var controller = new $ControllerConstructor('SignupController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
  });

  it('should be able to create a signin controller', function() {
    var controller = new $ControllerConstructor('SigninController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
  });

  describe('POST request', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('SignupController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to sign up a user', function() {
      var testUser1 = {_id: 1, email: 'tester1@test.test', password: 'foobar123'};
      $httpBackend
        .expectPOST('/api/signup', testUser1)
        .respond(200, {token: 'mytoken'});
      $scope.sendToServer(testUser1);
      $httpBackend.flush();
      expect($window.location.path).toBe('/main.html');
    });
  });

  describe('GET request', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('SigninController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to sign in a user', function() {
      var testUser2 = {email: 'tester2@test.test', password: 'foobar123'};
      $httpBackend
        .expectGET('/api/signin')
        .respond(200, {token: 'mytoken'});
      $scope.sendToServer(testUser2);
      $httpBackend.flush();
      expect($window.location.path).toBe('/main.html');
    });
  });
});
