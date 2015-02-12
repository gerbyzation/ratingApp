app.controller('AccountCtrl', function($scope,$rootScope, Ratings) {

  $scope.settings = {
    enableFriends: true
  };

  $scope.nukeDB = Ratings.nukeAll;
  $scope.dropTable = Ratings.dropTable;

  $scope.addTestData = function () {

    for (var i = 0; i < 10; i++) {
      Ratings.insert('test ' + i, 'cool', "file"+i, "home", Math.ceil(Math.random() * 10));
    }

  };

});