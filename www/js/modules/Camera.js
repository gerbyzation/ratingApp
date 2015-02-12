angular.module('Camera', []).factory('Camera', function ($cordovaCamera, $rootScope) {
  var Camera = {};

  Camera.getPicture = function () {

    console.log(Camera);
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true
    };
    
    $cordovaCamera.getPicture(options).then(function (imageURI) {
      // $scope.imgURL = imageURI;
      return imageURI;
    }, function (err ) {
      console.error(err);
      return false;
    });
  };

  return Camera;
});