'use strict'

describe('Global', function () {
  
  beforeEach(function () {
    module('cherry');
    module('cherry.global');
  });
    
  describe('Logger Service', function () {
    
    var _loggerService;
    
    beforeEach(function () {
      inject(function(logger) {
        _loggerService = logger;
      }); 
    });
    
    it('should define info, warning, and error.', function() {
      expect(_loggerService.info).toBeDefined();
      expect(_loggerService.warning).toBeDefined();
      expect(_loggerService.error).toBeDefined();             
    });
    
  });
});