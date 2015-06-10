// Register all module dependencies here

(function (angular) {

  'use strict';

  // Dashboard
  angular.module('myApp.dashboard', [
    'firebase',
    'firebase.auth',
    'firebase.utils',
    'ngRoute'
  ]);

  // Account
  angular.module('myApp.account', [
    'firebase',
    'firebase.auth',
    'firebase.utils',
    'ngRoute'
  ]);

  // Chat
  angular.module('myApp.chat', [
    'firebase',
    'firebase.utils'
  ]);

  // Signin
  angular.module('myApp.signin', [
    'firebase.auth',
    'firebase.utils',
    'ngRoute'
  ]);

  // Task
  angular.module('myApp.task', [
    'firebase',
    'firebase.auth',
    'firebase.utils',
    'ngRoute'
  ]);

})(angular);
