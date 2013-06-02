
'use strict';

angular.module('journalappApp')

  .controller('EntryListCtrl', function($scope, entryStorage) {
    entryStorage.then(function(entryStorage) {

        $scope.entries = entryStorage.entries;
        entryStorage.$register($scope);

    });

  })

;
