'use strict';

angular.module('journalappApp')

  .controller('EntryListCtrl', function($scope, entryStorage) {

      $scope.init = function(limit) {
        $scope.limit = limit;
        $scope.refresh();
      }

      $scope.refresh = function(){
        entryStorage.fetch($scope, {start: 0, stop: $scope.limit, reverse: true}).then(function(entries) {
          $scope.entries = entries;
        });
      };

      app.root.$on("EntryCreated", function(key, entry) {
        $scope.refresh();
      });

  })
;
