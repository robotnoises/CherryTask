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
    
    it('should define get, add, update, and list.', function() {
      expect(_taskService.get).toBeDefined();
      expect(_taskService.add).toBeDefined();   
      expect(_taskService.update).toBeDefined();   
      expect(_taskService.list).toBeDefined();               
    });
    
    
  });
});