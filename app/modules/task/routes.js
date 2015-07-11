(function (angular) {

  'use strict';

  angular.module('cherry.task')

  .config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .whenAuthenticated('/tasks/:id', {
      controller: 'taskController',
      templateUrl: 'modules/task/views/task.html',
      resolve: {
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });
  }]);

})(angular);
