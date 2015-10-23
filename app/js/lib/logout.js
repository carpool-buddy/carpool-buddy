module.exports = function(app) {
  app.run(['$rootScope', '$cookies', '$window', '$http',
    function($scope, $cookies, $window, $http) {
      $scope.checkLogin = function() {
        var eat = $cookies.get('eat');

        if(eat && eat.length) {
          if($window.location.pathname === '/' || $window.location.pathname === '/index.html') {
            $window.location.assign('/main.html')
          }
        }

        if(!(eat && eat.length) && $window.location.pathname === '/main.html') {
          $window.location.assign('/');
        }
      };

      $scope.logOut = function() {
        $cookies.remove('eat');
        $window.location.assign('/');
      };
    }
  ]);
};
