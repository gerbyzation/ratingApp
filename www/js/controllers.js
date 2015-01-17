angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function ($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, Ratings) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.nukeDB = Ratings.nukeAll;

})

.controller('PictureCtrl', function ($scope, $cordovaCamera) {
  $scope.data = "test";
  $scope.imgURL = null;

  var options = {
    destinationType: Camera.DestinationType.NATIVE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    saveToPhotoAlbum: true
  };

  // according to documentation deviceready eventlistener should be added
  $scope.getPicture = function () {
    console.log('executing getPicture()');

    $cordovaCamera.getPicture(options).then(function (imageURI) {
      console.log("succes callback");
      console.log(imageURI);
      $scope.imgURL = imageURI;
    }, function (err ) {
      console.log('error callback');
      console.error(err);
    });

    $cordovaCamera.cleanup().then( function () {
      // what's cleanup?
    });
  };

})

.controller('sqlCtrl', function ($scope, $rootScope, Ratings) {

  $scope.selectAll = Ratings.selectAll;
  $scope.insert = Ratings.insert;
  $scope.nukeAll = Ratings.nukeAll;
  
});