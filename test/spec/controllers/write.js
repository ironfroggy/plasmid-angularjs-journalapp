'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('journalappApp'));

  var WriteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WriteCtrl = $controller('WriteCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
  });
});
