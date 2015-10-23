module.exports = function(app) {
  app.directive('match', function() {
    return {
      //This solution is from http://stackoverflow.com/questions/14012239 (Jan Laussmann's solution)
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        if(!ngModel) return; // do nothing if no ng-model

        // watch own value and re-validate on change
        scope.$watch(attrs.ngModel, function() {
          validate();
        });

        // observe the other value and re-validate on change
        attrs.$observe('match', function (val) {
          validate();
        });

        var validate = function() {
          // values
          var val1 = ngModel.$viewValue;
          var val2 = attrs.match;

          // set validity
          ngModel.$setValidity('match', ! val1 || ! val2 || val1 === val2);
        };
      }
    };
  });
};
