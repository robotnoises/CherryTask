(function (angular) {
  'use strict';
  
  angular.module('cherry')
  
  .directive('fillY', function ($window) {
    return function (scope, element, attrs) {
      
      var $w = angular.element($window);
      var $html;
      var $nav;

      var timeout = 200;
      var offset = 32;
      var debounce = false; 
     
      function resize() {

        element.attr('style', function () {
          return 'height: ' + ($html[0].offsetHeight - $nav[0].offsetHeight - offset) + 'px;';
        });
        
      }
      
      function resizeHandler() {
        
        // If already handling the resize, exit.
        if (debounce) return;
        
        // Wait 200ms... 
        debounce = true;
          
        setTimeout(function () {
          // Resize the element
          resize();
          debounce = false;
        }, timeout);
        
      }
      
      function init() {
        $nav = angular.element('.navigation');
        $html = angular.element('html');
        resize();
      }
      
      // Init when the window is ready
      $w.ready(init);
      // Bind resize event to the window
      $w.bind('resize', resizeHandler);

    };
  })
    
})(angular);