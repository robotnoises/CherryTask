'use strict';

angular.module('cherry', [
  
  // Core modules
  
  'cherry.config',
  'cherry.global',
  'cherry.security',
  'cherry.account',
  'cherry.signin',
  'cherry.project',
  'cherry.task',
  
  // 3rd party
  
  'perfect_scrollbar',
  'ngMaterial',
  'ngMessages',
  'angularFileUpload',
  '720kb.tooltips'
]);
