'use strict'

describe('cherry.task', function () {
  
  beforeEach(function () {
    module('cherry');
    module('cherry.task');
  });
    
  describe('Task Service', function () {
    
    var _taskService;
    
    beforeEach(function () {
      inject(function(taskService) {
        _taskService = taskService;
      }); 
    });
    
    it('should do something.', function() {
      expect(true).toBe(true);            
    });
  });
});