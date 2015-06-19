(function (angular) {

  'use strict';

  angular.module('myApp.account')

  .config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .whenAuthenticated('/account', {
      controller: 'AccountCtrl',
      templateUrl: 'modules/account/view.html',
      resolve: {
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });
  }]);

})(angular);
