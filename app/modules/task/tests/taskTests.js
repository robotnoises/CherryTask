'use strict'

describe('cherry.task', function () {
  
  beforeEach(module('cherry.task'));
    
  describe('Task Service', function () {
    
    var _taskService;
    
    beforeEach(inject(function(taskService) {
      _taskService = taskService;
    }));
    
    it('should do something.', function() {
      expect(true).toBe(true);            
    });
  });
});