app.controller('NewCtrl', function ($scope, Camera, Ratings) {

  $scope.getPicture = Camera.getPicture;

  $scope.showCamera = function () {
    console.log($scope.getPicture);
  };

  $scope.add = Ratings.insert;
  
});