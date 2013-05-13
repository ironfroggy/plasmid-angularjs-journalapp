'use strict';

angular.module('journalappApp')
  .controller('WriteCtrl', function($scope) {
    $scope.addEntry = function(entry_text) {
      console.log("save: ", entry_text);
    }
  })
  .directive('write', function() {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        element.bind('keydown', function(e) {
          if (e.keyCode === 13) {
            var entry_text = element.val()
            $scope.addEntry(entry_text);
          }
        });
        element.bind('keyup', function(e) {
          if (e.keyCode === 13) {
            element.val('');
          }
        });
      }
    };
  })
;
