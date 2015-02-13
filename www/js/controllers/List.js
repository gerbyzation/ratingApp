app.controller('ListCtrl', function ($scope, $rootScope, Ratings) {
    
  document.addEventListener("deviceready", function () {    
    $scope.selectAll = Ratings.selectAll();
  }, false);

  $scope.doRefresh = function () {
    Ratings.selectAll();
    $scope.$broadcast('scroll.refreshComplete');
  };

});

app.controller('ListDetailCtrl', function ($scope, $rootScope, $state, $stateParams, $cordovaCamera, $cordovaSQLite, $ionicModal, Ratings) {

  $scope.numLimit = '-1';

  $scope.ratings = $rootScope.ratings;
  $rootScope.item = {};

  $scope.select = function () {
      // SQL ID is not zero-based, subtract 1 from ID to get index
      // $scope.item = $scope.ratings[$stateParams.itemId-1];
      Ratings.select($stateParams.itemId);
      console.log("item id to select", $stateParams.itemId);
      console.log("$scope.item", $rootScope.item);
  }();

  $scope.delete = function () {
    console.log("item ID", $stateParams.itemId);
    var conf = confirm("You sure you want to delete this item?", "Confirm delete", ["Delete", "Cancel"]);
    if (conf === true || conf === 1) {
      Ratings.delete($stateParams.itemId);
      $scope.modal.hide();
      $state.go('tab.list');
    } else {
      console.log(conf);
    }
  };

  var options = {
    quality: 100,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    saveToPhotoAlbum: true,
  };

  $scope.getPicture = function () {
    $cordovaCamera.getPicture(options).then(function (imageURI) {
      $scope.item.URI = imageURI;
    }, function (err ) {
      console.error(err);
      return false;
    });

  };

  $ionicModal.fromTemplateUrl('templates/modal-edit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openEdit = function() {
    $scope.modal.show();
  };

  $scope.closeEdit = function() {
    $scope.modal.hide();
    Ratings.update($scope.item.name, $scope.item.desc, $scope.item.URI, $scope.item.loc, $scope.item.rating, $scope.item.ID);
    $scope.ratings[$scope.item.ID -1] = $scope.item;

  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });

  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
});