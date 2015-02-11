app.controller('AccountCtrl', function($scope,$rootScope, Ratings) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.nukeDB = Ratings.nukeAll;
  $scope.dropTable = Ratings.dropTable;
  // $scope.addTestData = Ratings.addTestData;

  $scope.addTestData = function () {

    for (var i = 0; i < 10; i++) {
      Ratings.insert('test ' + i, "file"+i, "home", 'cool', '5');
    }

  };

});