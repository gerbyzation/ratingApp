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

.controller('sqlCtrl', function ($scope, $cordovaSQLite) {

  $scope.data = "Data";
  $scope.ratings = null;

  var db;

  // open (and if necessary initialize db)
  document.addEventListener("deviceready", function () {
    db = window.openDatabase('rating', '1.0', 'Rating DB', 100000000);

    var query = "CREATE TABLE IF NOT EXISTS ratings (ID integer unique primary key, item_name text, item_URI text, item_loc text, item_criteria text, item_rating integer);";
    $cordovaSQLite.execute(db, query, []).then(function (res) {
      // do nothing
    }, function (err) {
      console.error(err);
    });

    $cordovaSQLite.execute(db, 'SELECT * FROM ratings;', []).then(function (res) {
      console.log(res.rows.length);
      var items = [];
      for (var i = 0; i < res.rows.length; i++ ) {
        items.push(res.rows.item(i));
      }
      $scope.ratings =  items;
    }, function (err) {
      console.error(err);
    });

  }, false);

  $scope.insert = function (name, URI, loc, criteria, rating) {

    var query = "INSERT INTO ratings (item_name, item_URI, item_loc, item_criteria, item_rating) VALUES (?, ?, ?, ?, ?);";
    $cordovaSQLite.execute(db, query, [name, URI, loc, criteria, rating]).then(function (res) {
      var items = [];
      for (var i = 0; i < res.rows.length; i++ ) {
        items.push(res.rows.item(i));
      }
      $scope.ratings =  items;
      console.log(res);
    }, function (err) {
      console.error(err);
    });
  };

  $scope.nukeAll = function () {
    var query = "DELETE FROM ratings WHERE ID=*;";

    $cordovaSQLite.execute(db, query, []).then(function (res) {
      console.log("Deleted all DB entries");
      var items = [];
      for (var i = 0; i < res.rows.length; i++) {
        items.push(res.rows.item(i));
      }
      $scope.ratings =  items;
      console.log(items);
    }, function (err) {
      console.error(err);
    });
  };

  $scope.selectAll = function () {
    var query = "SELECT * FROM ratings;";
    $cordovaSQLite.execute(db, query, []).then(function (res) { 
      console.log();
      var items = [];
      for (var i = 0; i < res.rows.length; i++ ) {
        items.push(res.rows.item(i));
      }
      $scope.ratings =  items;
    }, function (err) {
      console.error(err);
    });
  };


});