angular.module('Ratings', []).factory('Ratings', function ($cordovaSQLite, $rootScope) {

  var Ratings = {};

  $rootScope.ratings = [];
  var db;

  // open (and if necessary initialize db)
  document.addEventListener("deviceready", function () {
    db = window.openDatabase('rating', '1.0', 'Rating DB', 100000000);

    var query = "CREATE TABLE IF NOT EXISTS ratings (ID integer unique primary key, name text, URI text, loc text, criteria text, rating integer);";
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
      // deep copy
      angular.copy(items, $rootScope.ratings);
    }, function (err) {
      console.error(err);
    });
  }, false);

  // return {
  Ratings.insert =  function (name, URI, loc, criteria, rating) {

    var query = "INSERT INTO ratings (name, URI, loc, criteria, rating) VALUES (?, ?, ?, ?, ?);";
    $cordovaSQLite.execute(db, query, [name, URI, loc, criteria, rating]).then(function (res) {
      var items = [];
      for (var i = 0; i < res.rows.length; i++ ) {
        items.push(res.rows.item(i));
      }
      console.log(res);
    }, function (err) {
      console.error(err);
    });
  };

  Ratings.update = function (name, URI, loc, criteria, rating, ID) {
    console.log(arguments);
    var query = "UPDATE ratings SET name=?, URI=?, loc=?, criteria=?, rating=? WHERE ID=?";
    $cordovaSQLite.execute(db, query, [name, URI, loc, criteria, rating, ID]).then( function (res) {
      console.log(res);
    }, function (err) {
      console.error(err);
    });
  };

  Ratings.selectAll = function () {
    var query = "SELECT * FROM ratings;";
    $cordovaSQLite.execute(db, query, []).then(function (res) { 

      var items = [];
      for (var i = 0; i < res.rows.length; i++ ) {
        items.push(res.rows.item(i));
      }
      // deep copy
      angular.copy(items, $rootScope.ratings);
    }, function (err) {
      console.error(err);
    });
  };

  Ratings.nukeAll = function () {
    var query = "DELETE FROM ratings;";

    $cordovaSQLite.execute(db, query, []).then(function (res) {
      console.log("Deleted all DB entries");
      console.log(res);
    }, function (err) {
      console.error(err);
    });
  };

  Ratings.dropTable = function () {
    var query = "DROP TABLE ratings;";

    $cordovaSQLite.execute(db, query, []).then(function () {
      console.log(res);
    }, function (err) {
      console.error(err);
    });
  };

  return Ratings;

});