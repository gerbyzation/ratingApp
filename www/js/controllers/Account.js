app.controller('AccountCtrl', function($scope, Ratings) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.nukeDB = Ratings.nukeAll;

});