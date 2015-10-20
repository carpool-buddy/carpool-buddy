module.exports = function(app) {
  app.controller('SignupController', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies) {
    $scope.buttonText = 'Signup!';
    $scope.confirmPassword = true;
    $scope.user = {};

    $scope.passwordMatch = function(user) {
      return user.password === user.confirmation;
    };

    $scope.disableButton = function(user) {
      return ($scope.userForm.$invalid && !$scope.passwordMatch(user));
    };

    $scope.changePlaces = function() {
      $location.path('/signin');
    };

    $scope.sendToServer = function(user) {
      $http.post('/api/signup', user)
        .then(function(res) {
          $cookies.put('eat', res.data.token);
          $scope.getEmail();
          $location.path('/trip');
        }, function(res) {
          console.log(res);
        });
    };
  }]);
};
