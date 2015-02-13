app.controller('RankCtrl', function ($scope, $rootScope, Ratings) {
    
  Ratings.selectOrdered();
});