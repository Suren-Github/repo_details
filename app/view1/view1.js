'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', 'Git', 'Transaction', function ($scope, gitFactory, transactionFactory) {

    const defaultValues = gitFactory.defaultValues();
    var db = openDatabase(defaultValues.DB_NAME, '1.0', 'Git DB', 2 * 1024 * 1024);

    function Git() {
    };

    Git.prototype.retriveUserRepos = (uName) => {

      return new Promise((resolve, reject) => {

        gitFactory.retriveUserRepos(uName)
          .then((response) => {

            console.log(response);

            let repos = response,
              repoDetails = [];

            angular.forEach(repos, (value, key) => {

              let owner = value.owner,
                mockDetails = {
                  user_id: owner.id,
                  user_name: owner.login,
                  repo_name: value.name,
                  avatar_url: owner.avatar_url,
                  git_url: owner.url,
                  created_at: value.created_at
                };

              repoDetails.push(mockDetails);

            });

            resolve(repoDetails);

          })
          .catch((error) => {
            reject(error);
          });

      });
    };

    Git.prototype.storeRepoDetails = (repoDetails) => {
      gitFactory.storeRepoDetails(repoDetails, db)
        .then((response) => {
          console.log("Repo Details Stored Successfully");
        });
    };

    Git.prototype.processUserRepos = (uName) => {
      return git.retriveUserRepos(uName)
        .then((repoDetails) => {

          $scope.$apply(() => {
            $scope.repoDetails = repoDetails;
          });

          return git.storeRepoDetails(repoDetails, db);

        });
    };

    var git = new Git();

    let uName = 'octocat';

    $scope.initRepoDetails = () => {
      transactionFactory.createTable(db)
        .then((response2) => {

          $scope.users = gitFactory.mostActiveUsers();
          git.processUserRepos(uName);

        })
        .catch((error) => {
          console.error("createTable ", error);
        });
    };

    $scope.getUserRepos = (uName) => {
      git.processUserRepos(uName);
    };

  }]);