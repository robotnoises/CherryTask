(function (angular) {

  'use strict';

  angular.module('myApp', [
      'myApp.config',
      'myApp.global',
      'myApp.security',
      'myApp.account',
      'myApp.signin',
      'myApp.task',
      'myApp.project',
      'perfect_scrollbar',
      'ngMaterial'
    ])

    .run(['$rootScope', 'Auth', 'fbutil', function($rootScope, Auth, fbutil) {
      Auth.$onAuth(function(user) {
        $rootScope.signedIn = !!user;
      });
    }]);

})(angular);
