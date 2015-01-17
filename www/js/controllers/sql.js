app.controller('sqlCtrl', function ($scope, $rootScope, Ratings) {

  $scope.selectAll = Ratings.selectAll;
  $scope.insert = Ratings.insert;
  $scope.nukeAll = Ratings.nukeAll;
  
});