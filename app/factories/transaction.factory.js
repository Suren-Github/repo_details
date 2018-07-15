'use strict';

angular.module('myApp.view1')
  .factory('Transaction', [function () {

    var transaction = {

      createTable: (db) => {

        return new Promise((resolve, reject) => {

          db.transaction(function (tx) {

            tx.executeSql('CREATE TABLE IF NOT EXISTS gitdetails (user_id text, user_name text, repo_name text, avatar_url text, git_url text, created_at text)');

          });

          resolve();

        });

      }

    };

    return transaction;

  }]);