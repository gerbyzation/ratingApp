app.controller('NewCtrl', function ($scope, $cordovaCamera, $cordovaGeolocation, $state, Ratings) {

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

  $scope.addTop = function () {
    Ratings.insert($scope.name, $scope.desc, $scope.imgURL, $scope.loc, $scope.rating);
    $state.go('tab.list');
  };

  $scope.add = function (name, desc, imgURL, loc, rating) {
    Ratings.insert(name, desc, imgURL, loc, rating);
    $state.go('tab.list');
  };

  var geoOptions = {
    timeout: 10000,
    enableHighAccuracy: true,
  };

  var mapOptions = {
    zoom: 15
  };

  var markerOptions = {
    map: map,
    title: "Current location"
  };

  $scope.initMap = function () {
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker(markerOptions);
    marker.setMap(map);
  };

  $scope.getLoc = function () {
    console.log("Get the position");
    $cordovaGeolocation.getCurrentPosition(geoOptions).then(function (position) {
      $scope.pos = {
        'lat': position.coords.latitude,
        'lng': position.coords.longitude
      };

      mapOptions.center = $scope.pos;
      markerOptions.position = $scope.pos;
      $scope.initMap();

      $scope.loc = position.coords.latitude + ',' + position.coords.longitude;
      
      console.log("Position: " + position.coords.latitude + " " + position.coords.longitude);
    }, function (err) {
      if (err.code == 3) {
        alert('Where are we? I can\'t find where we are', 'Oops!', 'OK');
      }
      console.error(err);
    });
  }();
  
});

// google.maps.event.addDomListener(window, 'load', initialize);

