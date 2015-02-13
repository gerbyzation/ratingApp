app.controller('ListCtrl', function ($scope, $rootScope, Ratings) {
    
    document.addEventListener("deviceready", function () {    
      $scope.selectAll = Ratings.selectAll();
    }, false);

    $scope.doRefresh = function () {
      Ratings.selectAll();
      $scope.$broadcast('scroll.refreshComplete');
    };

});

app.controller('ListDetailCtrl', function ($scope, $rootScope, $stateParams, $cordovaCamera, $ionicModal, Ratings) {

    $scope.numLimit = '-1';

    $scope.ratings = $rootScope.ratings;
    $scope.item = {};

    $scope.select = function () {

        // SQL ID is not zero-based, subtract 1 from ID to get index
        $scope.item = $scope.ratings[$stateParams.itemId-1];
        console.log($scope.ratings[$stateParams.itemId-1]);

    }();

    $scope.edit = false;

    $scope.enableEdit = function () {
        $scope.edit = true;
        console.log($scope.edit);
    };

    $scope.disableEdit = function () {
        Ratings.update($scope.item.name, $scope.item.desc, $scope.item.URI, $scope.item.loc, $scope.item.rating, $scope.item.ID);
        $scope.ratings[$scope.item.ID -1] = $scope.item;
        $scope.edit = false;
    };

    var options = {
      quality: 100,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
    };

    $scope.getPicture = function () {
      $cordovaCamera.getPicture(options).then(function (imageURI) {
        // $scope.imgURL = imageURI;
        $scope.item.URI = imageURI;
      }, function (err ) {
        console.error(err);
        return false;
      });

    };

});