app.controller('NewCtrl', function ($scope, $cordovaCamera, Ratings) {

  var cameraOptions = {
    quality: 100,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    saveToPhotoAlbum: true
  };

  $scope.imgURl = "";

  $scope.getPicture = function () {
    $cordovaCamera.getPicture(cameraOptions).then(function (imageURI) {
      // $scope.imgURL = imageURI;
      $scope.imgURL = imageURI;
    }, function (err ) {
      console.error(err);
      return false;
    });

  };

  $scope.add = Ratings.insert;


  var geoOptions = {
    timeout: 10000,
    enableHighAccuracy: false,
  };

  $scope.getLoc = function () {
    console.log("Get the position");
    $cordovaGeolocation.getCurrentPosition(geoOptions).then(function (position) {
      $scope.pos = {
        'lat': position.coords.latitude,
        'lng': position.coords.longitude
      };
      
      console.log("Position: " + position.coords.latitude + " " + position.coords.longitude);
    }, function (err) {
      console.error(err);
    });
  };
  
});