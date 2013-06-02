
'use strict';

angular.module('journalappApp')

  .controller('EntryListCtrl', function($scope, entryStorage) {

      entryStorage.fetch($scope).then(function(entries) {
        $scope.entries = entries;
      });

  })

;
