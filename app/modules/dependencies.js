// Register all module dependencies here

(function (angular) {

  'use strict';

  // Account
  angular.module('cherry.account', [
    'firebase',
    'firebase.auth',
    'firebase.utils',
    'ngRoute'
  ]);

  // Signin
  angular.module('cherry.signin', [
    'firebase.auth',
    'firebase.utils',
    'ngRoute'
  ]);

  // Project
  angular.module('cherry.project', [
    'firebase.auth',
    'ngRoute'
  ]);

  // Task
  angular.module('cherry.task', [
    'firebase',
    'firebase.auth',
    'firebase.utils',
    'ngRoute'
  ]);

})(angular);
