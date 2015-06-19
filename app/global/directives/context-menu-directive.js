(function (angular) {

  'use strict';

  angular.module('myApp')

  .directive('contextMenu', ['$rootScope' , function($rootScope) {
    return {
      restrict: 'E',        // match element name, only
      scope: $rootScope.contextMenu,  // An array of menu item objects
      templateUrl: 'templates/directives/contextMenu.html'
    };
  }]);

})(angular);
