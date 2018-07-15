'use strict';

angular.module('myApp.view1')
  .factory('Git', ['$http', 'config',

    function ($http, config) {

      var git = {

        defaultValues: () => {

          const gitValues = {
            DB_NAME: 'gitdb'
          };

          return gitValues;
        },

        mostActiveUsers: () => {
          return [
            'fabpot', 'andrew', 'taylorotwell', 'egoist', 'ornicar', 'bebraw'
          ];
        },

        /** API request to fetch the user repos */
        retriveUserRepos: (uName) => {

          return new Promise((resolve, reject) => {

            $http.get(config.baseUrl + "users/" + uName + "/repos")
              .success(function (response, status, headers, config) {
                resolve(response);
              })
              .error(function (response, status, headers, config) {
                reject(response);
              });

          });

        },

        storeRepoDetails: (repoDetails, db) => {
          return new Promise((resolve, reject) => {

            db.transaction(function (tx) {
              
              angular.forEach(repoDetails, (value) => {
                tx.executeSql('INSERT INTO gitdetails (user_id, user_name, repo_name, avatar_url, git_url, created_at) VALUES (?,?,?,?,?,?)',
                  [value.user_id, value.user_name, value.repo_name, value.avatar_url,
                  value.git_url, value.created_at]);
              });

              resolve(true);
            });

          });
        }

      };

      return git;

    }]);