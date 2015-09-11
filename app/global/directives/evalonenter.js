'use strict';

angular.module('cherry').directive('evalOnEnter', function () {
  
  return function (scope, element, attrs) {
    // Bind key events
    element.bind('keyup', function (e) {
      
      if (e.which !== 13) return;
      
      // on the next digest cycle....
      scope.$apply(function () {
        // evaluate whatever function was passed-in
        scope.$eval(attrs['evalOnEnter']);
      });
      
    })
  }
  
});