'use strict';

angular.module('myApp.view1')
  .factory('Git', ['$http', 'config',

    function ($http, config) {

      var git = {

        defaultValues: () => {

          const gitValues = {
            TBL_NAME: 'GIT_DETAILS'
          };

          return gitValues;
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

        storeRepoDetails: () => {
          return new Promise((resolve, reject) => {


          });
        }

      };

      return git;

    }]);