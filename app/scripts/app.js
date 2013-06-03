'use strict';

function AppliedPromise(promise, scope, msg) {
  var wrap = new plasmid.Promise();
  promise.then(function(result) {
    wrap.ok(result);
    scope.$apply();
  }, function(err) {
    wrap.error(err);
    scope.$apply();
  });
  return wrap;
};

angular.module('journalappApp', [])

  .config(function ($routeProvider) {

    angular.injector(['ng']).invoke(function($rootScope) {
      app.root = $rootScope;
    });

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/write', {
        templateUrl: 'views/write.html',
        controller: 'WriteCtrl'
      })
      .when('/archive', {
        templateUrl: 'views/archive.html',
        controller: 'ArchiveCtrl'
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

    function method(func) {
      return function(scope) {
        var args = arguments;
        var p = new plasmid.Promise();
        wait.then(function() {
          var mp = func.apply(service, args);
          var ap = AppliedPromise(mp, scope);
          ap.then(function(r){
            p.ok(r);
          }, function(e) {
            p.error(e);
          });
        });
        return p;
      }
    };

    var service = {
      $register: function(scope) {
        $register(scope);
      },

      fetch: method(function(scope, filter) {
        var fetch = DB.stores.entries.fetch(filter); 
        var entries = [];
        var p = new plasmid.Promise();
        fetch.then(function(results) {
          for (var i = 0; i < results.length; i++) {
            entries.splice(0, 0, results[i].value );
          }
          p.ok(entries);
        });
        return p;
      }),

      count: method(function(scope) {
        return DB.stores.entries.count();
      }),

      save: method(function(scope, entry_text) {
        var entry = {
          text: entry_text,
          created: new Date(),
        };
        var add = DB.stores.entries.add(new Date(), entry);
        add.then(function(key) {
          app.root.$emit("EntryCreated", key, entry);
        });
        return add;
      }),

    };

    DB.onopensuccess = function() {
      wait.ok(service);
    };
    var wait = new plasmid.Promise();
    return service;
  })
;
