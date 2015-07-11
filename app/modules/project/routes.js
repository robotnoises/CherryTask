(function (angular) {

  'use strict';

  angular.module('cherry.project')

  .config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .whenAuthenticated('/', {
      controller: 'allProjectsController',
      templateUrl: 'modules/project/views/project-list.html',
      resolve: {
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    })

    .whenAuthenticated('/projects/:id', {
      controller: 'projectController',
      templateUrl: 'modules/project/views/project.html',
      resolve: {
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });

  }]);

})(angular);
