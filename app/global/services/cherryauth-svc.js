(function (angular) {

  'use strict';

  angular.module('cherry.global')

  .factory('cherryAuth', [ '$q', 'fbutil', '$firebaseObject', 'Auth', 
    function($q, fbutil, $firebaseObject, Auth) {

      var pub = {};
  
      var _currentAuth;
      
      // Private
      function getAuth() {
        _currentAuth = _currentAuth || Auth.$getAuth();
        return _currentAuth;
      }
      
      // Public
     
      var _get = function (uid) {
        var d = $q.defer();
        var id = uid || getAuth().uid;
        var ref = fbutil.ref('users', id);
        
        ref.once('value', function (snapshot) {
          return d.resolve(snapshot.val());
        });
        
        return d.promise;
      };
      
      var _reset = function () {
        _currentAuth = null;
      };
                  
      pub.get = _get;
      pub.reset = _reset;
            
      return pub;
    }]);

})(angular);
