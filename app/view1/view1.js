'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['Git', 'Transaction', function (gitFactory, transactionFactory) {

    const defaultValues = gitFactory.defaultValues();

    function Git() {
    };

    Git.prototype.retriveUserRepos = function (uName) {

      gitFactory.retriveUserRepos(uName)
        .then((response) => {

          let repos = response,
            userDetails = [];

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

            userDetails.push(mockDetails);

          });



          gitFactory.storeRepoDetails()
            .then((response3) => {

            });


          console.log(response);
        })
        .catch((error) => {
          console.error("retrieveUserRepos ", error);
        })
    };

    var git = new Git();
    debugger;
    let uName = 'octocat';

    (initOnLoad = () => {
      transactionFactory.createTable(defaultValues.TBL_NAME)
        .then((response2) => {

        })
        .catch((error) => {
          console.error("createTable ", error);
        });
    })();


    git.retriveUserRepos(uName);


  }]);