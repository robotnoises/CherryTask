/* global angular */

(function (angular) {

  'use strict';

  angular.module('cherry.global')

  .factory('logger', ['fbutil', 'apiService', function(fbutil, api) {
 	
    var pub = {};
    
    // Private
    
    var writeLog = function (log) {
      api.create('activity_log/', log).then(function (snap) {
      // console.log(snapshot.val());
      }).catch(function (err) {
        console.error(err);
      });
    };
    
    // Public
  
    var _info = function (message) {
      var log = { type: 'INFO', date_created: new Date().getTime(), message: message };
      writeLog(log);
    };
      
    var _warning = function (message) {
      var log = { type: 'WARNING', date_created: new Date().getTime(), message: message };
      writeLog(log);
    };
    
    var _error = function (exception) {
      var log = { type: 'ERROR', date_created: new Date().getTime(), message: exception.message || "Uncaught error." };
      writeLog(log);
    };
    
    pub.info = _info;
    pub.warning = _warning;
    pub.error = _error;
	
    return pub;
  }]);

})(angular);
