/* global angular */

(function (angular) {

  'use strict';

  angular.module('myApp.global')

  .factory('logger', ['fbutil', 'apiService', function(fbutil, api) {
	
	var writeLog = function (log) {
	  api.create('activity_log/', log, function (snapshot) {
		 console.log(snapshot.val());
		 // Todo check error
	  });	
	};
	
    var pub = {};
	
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
