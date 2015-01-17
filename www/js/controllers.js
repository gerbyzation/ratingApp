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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('PictureCtrl', function ($scope, $cordovaCamera) {
  $scope.data = "test";

  // according to documentation deviceready eventlistener should be added
  $scope.getPicture = function () {
    console.log('executing getPicture()');
    var options = {
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
    };

    $cordovaCamera.getPicture(options).then(function (imageURI) {
      var image = document.getElementByID('myImage');
      image.src = imageURI;
    }, function (err ) {
      console.error(err);
    });

    $cordovaCamera.cleanup().then( function () {
      // what's cleanup?
    });
  };

})

.controller('sqlCtrl', function ($scope, Ratings) {

  $scope.data = "Data";

  $scope.ratings = Ratings.selectAll();
  $scope.insert = Ratings.insert();
  $scope.nukeAll = Ratings.nukeAll;
  


});