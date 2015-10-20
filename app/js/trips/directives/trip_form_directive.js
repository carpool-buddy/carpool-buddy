module.exports = function(app) {
  app.directive('tripForm', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/trips/directives/trip_form_template.html',
      scope: {
        labelText: '@',
        buttonText: '@',
        trip: '=',
        save: '&'
      },
      controller: function($scope) {
        console.log($scope.save);
      }
    }
  });
};
