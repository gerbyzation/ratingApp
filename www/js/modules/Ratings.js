angular.module('Ratings', []).service('Ratings', function ($cordovaSQLite, $rootScope) {
  
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
    this.insert=  function (name, URI, loc, criteria, rating) {

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

    this.update= function (name, URI, loc, criteria, rating, id) {
      var query = "UPDATE ratings SET name='?', URI='?', loc='?', criteria='?', rating='?' WHERE ID='?'";
      $cordovaSQLite.execute(db, query, [name, URI, loc, criteria, rating, id]).then( function (res) {
        console.log(res);
      }, function (err) {
        console.error(err);
      });
    };

    this.selectAll= function () {
      var query = "SELECT * FROM ratings;";
      $cordovaSQLite.execute(db, query, []).then(function (res) { 

        var items = [];
        for (var i = 0; i < res.rows.length; i++ ) {
          items.push(res.rows.item(i));
        }
        angular.copy(items, $rootScope.ratings);
        console.log($rootScope.ratings);
        return items;
      }, function (err) {
        console.error(err);
      });
    };
    // this.select= function (id) {

    //   console.log(id);
    //   var query = "SELECT * FROM ratings WHERE ID=?;";
    //   $cordovaSQLite.execute(db, query, [id]).then(function (res) {
    //     item = res.rows.item(0);
    //     return item;
    //   }, function (err) {
    //     console.error(err);
    //   });
    // };

    this.nukeAll= function () {
      var query = "DELETE FROM ratings;";

      $cordovaSQLite.execute(db, query, []).then(function (res) {
        console.log("Deleted all DB entries");
        console.log(res);
      }, function (err) {
        console.error(err);
      });
    };

    this.dropTable = function () {
      var query = "DROP TABLE ratings;";

      $cordovaSQLite.execute(db, query, []).then(function () {
        console.log(res);
      }, function (err) {
        console.error(err);
      });
    };
    
  // };

});