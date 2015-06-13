/* global angular */

(function (angular) {

  'use strict';

  angular.module('myApp.global')

  .factory('chUser', [ 'Auth', function(Auth) {

    var pub = {};

    // Private

    var currentUser;

    var getUserFromFirebase = function (callback) {
      if (currentUser) {
        return callback(currentUser);
      } else {
        Auth.$onAuth(function (user) {
          currentUser = user;
          return callback(user);
        });
      }
    };

    // Public

    var _get = function (callback) {
      getUserFromFirebase(function (user) {
        return callback(user);
      });
    };

    pub.get = _get;

    return pub;
  }]);

})(angular);
