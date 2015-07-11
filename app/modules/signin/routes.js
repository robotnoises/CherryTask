(function (angular) {

  'use strict';

  angular.module('cherry.signin')

  .config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .when('/signin', {
      controller: 'signinController',
      templateUrl: 'modules/signin/views/signin.html'
    });
    
  }]);

})(angular);
