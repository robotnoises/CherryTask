(function (angular) {

  'use strict';

  angular.module('cherry.project')

  .config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .whenAuthenticated('/', {
      controller: 'allProjectsController',
      templateUrl: 'modules/project/views/view-all.html',
      resolve: {
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    })

    .whenAuthenticated('/projects/:id', {
      controller: 'projectController',
      templateUrl: 'modules/project/views/view.html',
      resolve: {
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });

  }]);

})(angular);
