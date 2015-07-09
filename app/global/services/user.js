/* global angular */

(function (angular) {

  'use strict';

  angular.module('cherry.global')

  .factory('cherryUser', [ '$q', 'fbutil', '$firebaseObject', 'Auth', function($q, fbutil, $firebaseObject, Auth) {

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
    
    var _getFull = function (callback) {
      getUserFromFirebase(function (user) {
        var ref = fbutil.ref('users', user.uid);
        ref.once('value', function (snapshot) {
          return callback(snapshot.val());  
        });
      });
    };
    
    var reset = function () {
      currentUser = undefined;
    };

    pub.get = _get;
    pub.getFull = _getFull;
    pub.reset = reset;
    
    return pub;
  }]);

})(angular);
