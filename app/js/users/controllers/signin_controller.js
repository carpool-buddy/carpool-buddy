module.exports = function(app) {
  app.controller('SigninController', ['$scope', '$http', '$base64', '$location', '$cookies',  function($scope, $http, $base64, $location, $cookies) {
    $scope.buttonText = 'Login';
    $scope.user = {};

    $scope.sendToServer = function(user) {
      $http({
        method: 'GET',
        url: '/api/signin',
        headers: {
          'Authorization': 'Basic ' + $base64.encode(user.email + ':' + user.password)
        }
      })
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
