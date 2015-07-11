(function (angular) {

  'use strict';

  angular.module('cherry.global')

  .factory('cherryAuth', [ '$q', 'fbutil', '$firebaseObject', 'Auth', 
    function($q, fbutil, $firebaseObject, Auth) {

      var pub = {};
  
      var _currentAuth;
      
      // Public
     
      var _get = function (callback) {
        _currentAuth = _currentAuth || Auth.$getAuth();
        var ref = fbutil.ref('users', _currentAuth.uid);
        ref.once('value', function (snapshot) {
          return callback(snapshot.val());  
        });
      };      
      
      var _reset = function () {
        _currentAuth = undefined;
      };
                  
      pub.get = _get;
      pub.reset = _reset;
            
      return pub;
    }]);

})(angular);
