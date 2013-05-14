'use strict';

angular.module('journalappApp')

  .controller('WriteCtrl', function($scope, entryStorage) {
    $scope.addEntry = function(entry_text) {
      entryStorage.then(function(entryStorage){
        entryStorage.save(entry_text);
        $scope.entryTotal += 1;
        $scope.$apply();
      });
    }

    entryStorage.then(function(entryStorage) {
      entryStorage.count()
      .then(function(n){
        $scope.entryTotal = n;
        $scope.$apply();
      });
    });
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
