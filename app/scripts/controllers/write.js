'use strict';

angular.module('journalappApp')

  .controller('WriteCtrl', function($scope, entryStorage) {
    $scope.wordTotal = 0;

    $scope.addEntry = function(entry_text) {
      entryStorage.save($scope, entry_text);
      $scope.entryTotal += 1;
    }

    entryStorage.count($scope)
    .then(function(n){
      $scope.entryTotal = n;
    });
  })

  // The write directive enables write-and-submit behavior for text entries,
  // where their contents are submitted and cleared on [enter] press.
  .directive('write', function() {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        element[0].focus();

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
