module.exports = function(app) {
  app.controller('SigninController',
    ['$scope', '$http', '$window', '$base64', '$cookies',
    function($scope, $http, $window, base64, $cookies) {
      $scope.user = {};
      $scope.confirmPassword = false;

      $scope.sendToServer = function(user) {
        $http({
          method: 'GET',
          url: '/api/signin',
          headers: {
            'Authorization': 'Basic ' + base64.encode(user.email + ':' + user.password)
          }
        })
          .then(function(res) {
            $cookies.put('eat', res.data.token);
            console.log('login');
            $window.location.assign('/main.html');
          }, function(res) {
            console.log(res);
          });
      };
    }]
  );
};
