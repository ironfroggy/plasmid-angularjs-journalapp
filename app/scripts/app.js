'use strict';

var dbconfig = {
  name: "journalapp",
  schema: {
    version: 1,
    stores: {
      entries: {sync: false}
    }
  }
};

angular.module('journalappApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/write', {
        templateUrl: 'views/write.html',
        controller: 'WriteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .factory('entryStorage', function() {
    var plasmid = require('plasmid');
    var DB = new plasmid.Database(dbconfig);

    var service = {

      fetch: function() {
        return DB.stores.entries.walk(); 
      },

      count: function() {
        return DB.stores.entries.count();
      },

      save: function(entry_text) {
        DB.stores.entries.add(new Date(), {
          text: entry_text,
          created: new Date(),
        });
      },

    };

    DB.onopensuccess = function() {
      wait.ok(service);
    };
    var wait = new plasmid.Promise();
    return wait;
  })
;
