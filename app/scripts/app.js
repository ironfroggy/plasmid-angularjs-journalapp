'use strict';

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
      .when('/entries', {
        templateUrl: 'views/entries.html',
        controller: 'EntryListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .factory('entryStorage', function() {
    var plasmid = require('plasmid');
    var DB = new plasmid.Database(app.dbconfig);

    var scopes = [];
    var $apply = function() {
      for (var i=0; i < scopes.length; i++) {
        scopes[i].$apply();
      }
    };
    var $register = function(scope) {
        scopes.push(scope);
        scope.$apply();
    };

    var service = {
      $register: function(scope) {
        $register(scope);
      },

      entries: [],

      fetch: function() {
        var walk = DB.stores.entries.walk(); 
        var entries = this.entries;
        walk.on('each', function(entry) {
            entries.push(entry.value);
        });
        walk.then($apply);
        return walk;
      },

      count: function() {
        return DB.stores.entries.count();
      },

      save: function(entry_text) {
        var entry = {
          text: entry_text,
          created: new Date(),
        };
        service.entries.push(entry);
        DB.stores.entries.add(new Date(), entry).then($apply);
      },

    };

    DB.onopensuccess = function() {
      service.fetch().then(function(){
        wait.ok(service);
      });
    };
    var wait = new plasmid.Promise();
    return wait;
  })
;
