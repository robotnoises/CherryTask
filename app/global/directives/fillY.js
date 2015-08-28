(function (angular) {
  'use strict';
  
  angular.module('cherry')
  
  .directive('fillY', function ($window) {
    return function (scope, element, attrs) {
      
      var $w = angular.element($window);
      var $html = angular.element('html');
      var $nav = angular.element('.navigation');
      
      var timeout = 200;
      var debounce = false; 
      
      function resize() {

        element.attr('style', function () {
          return 'height: ' + ($html[0].offsetHeight - $nav[0].offsetHeight ) + 'px;';
        });
        
      }
      
      function resizeHandler() {
        
        // If already handling the resize, exit.
        if (debounce) return;
        
        // Resize the element
        resize();
          
        // Reset flag
        setTimeout(function () {
          debounce = false;
        }, timeout);
        
      }
      
      $w.bind('resize', resizeHandler);
      
      resize();

    };
  })
    
})(angular);