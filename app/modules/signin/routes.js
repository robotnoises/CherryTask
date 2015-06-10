(function (angular) {

  'use strict';

  angular.module('myApp.signin')

  .config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .when('/signin', {
      controller: 'SigninCtrl',
      templateUrl: 'modules/signin/view.html'
    })
  }]);

})(angular);
