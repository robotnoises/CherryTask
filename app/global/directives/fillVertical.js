(function (angular) {
  'use strict';
  
  angular.module('cherry')
  
  .directive('fillVertical', function () {
    return function (scope, element, attrs) {
      var $window = angular.element('window');
      
      // TODO: debounce
      // scope.$watch(function () {
      //   return {
      //     height: $window.height(),
      //     width: $window.width()
      //   }
      // }), function () {
      //   element
      // }
      
    };
  })
    
})(angular);