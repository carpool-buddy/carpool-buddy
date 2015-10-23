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

  describe('REST requests', function() {
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
      $httpBackend
        .expectPOST('/api/signup', {_id: 1, email: 'testerattest.test', password: 'foobar123'})
        .respond(200, {token: 'mytoken'});
      $scope.sendToServer({_id: 1, email: 'testerattest.test', password: 'foobar123'});
      $httpBackend.flush();
      //expect($window.location.path).toBe('/main.html');
    })
  });
});
