app.controller('GeoCtrl', function($scope, $cordovaGeolocation) {

  var options = {
    timeout: 10000,
    enableHighAccuracy: false,
  };

  $scope.getLoc = function () {
    console.log("Get the position");
    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
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