'use strict';

var app = angular.module('journalappApp', []);

app.version = 3;
app.dbconfig = {
  name: "journalapp",
  schema: {
    version: 1,
    stores: {
      entries: {sync: false}
    }
  }
};
