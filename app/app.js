(function (angular) {

  'use strict';

  angular.module('myApp', [
      'myApp.config',
      'myApp.global',
      'myApp.security',
      'myApp.account',
      'myApp.signin',
      'myApp.task',
      'myApp.global'
    ])

    .run(['$rootScope', 'Auth', 'fbutil', function($rootScope, Auth, fbutil) {
      Auth.$onAuth(function(user) {
        $rootScope.signedIn = !!user;
        $rootScope.user = user;
      });
    }]);

})(angular);
