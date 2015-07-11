(function (angular) {

  'use strict';

  angular.module('cherry.account')

  .config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .whenAuthenticated('/account', {
      controller: 'accountController',
      templateUrl: 'modules/account/views/account.html',
      resolve: {
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });
  }]);

})(angular);
