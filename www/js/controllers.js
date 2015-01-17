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
})






.controller('sqlCtrl', function ($scope, $rootScope, Ratings) {

  $scope.selectAll = Ratings.selectAll;
  $scope.insert = Ratings.insert;
  $scope.nukeAll = Ratings.nukeAll;
  
});