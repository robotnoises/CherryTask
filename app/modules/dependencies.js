// Register all module dependencies here

(function (angular) {

  'use strict';

  // Account
  angular.module('myApp.account', [
    'firebase',
    'firebase.auth',
    'firebase.utils',
    'ngRoute'
  ]);

  // Signin
  angular.module('myApp.signin', [
    'firebase.auth',
    'firebase.utils',
    'ngRoute'
  ]);

  // Project
  angular.module('myApp.project', [
    'firebase.auth',
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
