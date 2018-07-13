'use strict';

angular.module('myApp.view1')
  .factory('Transaction', [function () {

    var transaction = {

      createTable: (tName) => {

        let db = openDatabase('gitdb', '1.0', 'Git DB', 2 * 1024 * 1024);

        db.transaction(function (tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS GIT(id unique, user_id, user_name, repo_name, avatar_url, git_url, created_at)');
        });

      }

    };

    return transaction;

  }]);