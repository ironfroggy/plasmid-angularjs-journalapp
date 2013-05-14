'use strict';

angular.module('journalappApp')

  .factory('entryStorage', function() {
    var plasmid = require('plasmid');
    var DB = new plasmid.Database({
      name: "journalapp",
      schema: {
        version: 1,
        stores: {
          entries: {sync: false}
        }
      }
    });

    var service = {};
    var wait = new plasmid.Promise();

    DB.onopensuccess = function() {
      wait.ok(service);
    };

    service.fetch = function() {
      return DB.stores.entries.walk(); 
    };

    return wait;
  })

  .controller('WriteCtrl', function($scope, entryStorage) {
    $scope.addEntry = function(entry_text) {
      console.log("save: ", entry_text);
    }

    entryStorage.then(function(entryStorage) {
      entryStorage.fetch()
      .then(function(entries){
        console.log('found ' + entries.length + ' entries');
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
