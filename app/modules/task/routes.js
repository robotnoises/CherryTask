(function (angular) {

  'use strict';

  angular.module('myApp.task')

  .config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .whenAuthenticated('/', {
      controller: 'allTasksController',
      templateUrl: 'modules/task/view-tasks.html',
      resolve: {
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    })

    .whenAuthenticated('/task/:id', {
      controller: 'taskController',
      templateUrl: 'modules/task/view.html',
      resolve: {
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });

  }]);

})(angular);
