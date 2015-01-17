app.controller('PictureCtrl', function ($scope, $cordovaCamera) {
  $scope.getPicture = function () {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true
    };

    $cordovaCamera.getPicture(options).then(function (imageURI) {
      console.log("succes callback");
      $scope.imgURL = imageURI;
    }, function (err ) {
      console.error(err);
    });
  };
});