'use strict';

angular.module('journalappApp')
  .controller('WriteCtrl', function($scope) {

  })
  .directive('entry', function(scope, element, attrs) {
    element.addClass('entry');
  })
;
