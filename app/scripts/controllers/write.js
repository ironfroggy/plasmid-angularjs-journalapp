'use strict';

angular.module('journalappApp')

  .controller('WriteCtrl', function($scope, entryStorage) {
    $scope.wordTotal = 0;

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

  // The write directive enables write-and-submit behavior for text entries,
  // where their contents are submitted and cleared on [enter] press.
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
          $scope.wordTotal = 0;
          if (e.keyCode === 13) {
            element.val('');
          } else {
            if (element.val().trim().length > 0) {
              $scope.wordTotal = element.val().split(' ').length;
            }
          }
          $scope.$apply();
        });
      }
    };
  })
;
