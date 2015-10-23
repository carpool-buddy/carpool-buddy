module.exports = function(app) {
  app.run(['$rootScope', '$cookies', '$window', '$http',
    function($scope, $cookies, $window, $http) {
      $scope.loggedIn = function() {
        var eat = $cookies.get('eat');
        return (eat && eat.length);
      };

      $scope.logOut = function() {
        console.log('remove cookie');
        $cookies.remove('eat');
        $window.location.assign('/');
      };
    }
  ]);
};