app.controller('NewCtrl', function ($scope, $cordovaCamera, Ratings) {

  var options = {
    quality: 100,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    saveToPhotoAlbum: true
  };

  $scope.imgURl = "";

  $scope.getPicture = function () {
    $cordovaCamera.getPicture(options).then(function (imageURI) {
      // $scope.imgURL = imageURI;
      $scope.imgURL = imageURI;
    }, function (err ) {
      console.error(err);
      return false;
    });

  };

  $scope.add = Ratings.insert;
  
});