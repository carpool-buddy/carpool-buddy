module.exports = function(app) {
  app.controller('SignupController',
    ['$scope', '$http', '$location',
    function($scope, $http, $location) {
      $scope.user = {};
      $scope.confirmPassword = true;

      $scope.passwordMatch = function(user) {
        return user.password === user.confirmation;
      };

      $scope.disableButton = function(user) {
        return ($scope.userForm.$invalid && !$scope.passwordMatch(user));
      };

      $scope.sendToServer = function(user) {
        $http.post('/api/signup', user)
          .then(function(res) {
            //TODO: save token into cookie
            //TODO: go to app after login
          }, function(res) {
            console.log(res);
          });
      };
    }]
  );
};
