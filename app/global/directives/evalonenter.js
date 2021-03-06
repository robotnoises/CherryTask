(function (angular) {
  'use strict';
  
  angular.module('cherry').directive('evalOnEnter', function () {
  
    return function (scope, element, attrs) {
      
      function isInput () {
        var tag = element.context.tagName; 
        return tag === 'input' || tag === 'textarea';
      }
            
      if (!isInput()) {
        attrs.$set('tabindex', '1');
      }
      
      // Bind key events
      element.bind('keyup', function (e) {
        
        // If they did not hit enter...
        if (e.which !== 13) return;
        
        // on the next digest cycle....
        scope.$apply(function () {
          // evaluate whatever function was passed-in
          scope.$eval(attrs.evalOnEnter);
        });
      });
    };
  });
  
})(angular);