(function (angular) {

  'use strict';

  angular.module('cherry.global')

  .factory('apiService', ['fbutil', '$firebaseObject', '$firebaseArray', '$q', 'cherryAuth',
    function(fbutil, $firebaseObject, $firebaseArray, $q, cherryAuth) {

    var pub = {};

    // Private

    var getTenant = function (callback) {
      cherryAuth.get().then(function (a) {
        return callback('tenants/' + a.authorization.tenant + '/');
      });
    };

    // Public

    var _getList = function (loc, limit) {
      var d = $q.defer();
      
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc).limitToLast(limit);
        d.resolve($firebaseArray(ref));
      });
      
      return d.promise;
    };

    var _getListBy = function (loc, key, value, limit, callback) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc);
        var query = ref.orderByChild(key).equalTo(value).limitToLast(limit);
        return callback($firebaseArray(query));
      });
    };

    var _getSingle = function (loc, key, callback) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc + key).orderByKey();
        return callback($firebaseObject(ref));
      });
    };

    var _create = function (loc, data, callback) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc);
        ref.push(data);
        ref.once('child_added', function (snapshot) {
          return callback(snapshot);
        });
      });
    };

    var _update = function (loc, data, priority) {
      getTenant(function (tenant) {
        var ref = fbutil.ref(tenant + loc);
        ref.setWithPriority(data, priority, function (err) {
          if (err) {
            // TODO: error
          }
        });
      });
    };

    pub.list = _getList;
    pub.listBy = _getListBy;
    pub.get = _getSingle;
    pub.create = _create;
    pub.update = _update;

    return pub;
  }]);

})(angular);
