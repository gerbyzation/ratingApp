app.controller('AccountCtrl', function($scope,$rootScope, Ratings) {

  // clear table
  $scope.nukeDB = Ratings.nukeAll;

  // destroy table
  $scope.dropTable = Ratings.dropTable;

  // add some random data to database
  $scope.addTestData = function () {

    for (var i = 0; i < 10; i++) {
      Ratings.insert('test ' + i, 'cool', undefined, "home", Math.ceil(Math.random() * 10));
    }

  };

});