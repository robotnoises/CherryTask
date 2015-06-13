/* global angular */

(function (angular) {

  'use strict';

  angular.module('myApp.global')

  .factory('chUser', [ 'fbutil', '$firebaseObject', 'Auth', function(fbutil, $firebaseObject, Auth) {

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
        ref.on('value', function (snapshot) {
          return callback(snapshot.val());  
        });
      });
    };

    pub.get = _get;
    pub.getFull = _getFull;
    
    return pub;
  }]);

})(angular);
