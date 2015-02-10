app.controller('ListCtrl', function ($scope, $rootScope, Ratings) {
    
    $scope.selectAll = Ratings.selectAll();

});

app.controller('ListDetailCtrl', function ($scope, $stateParams, Ratings) {
    $scope.item = {
        name: "Sjaak",
        hobby: 'sjoelen'
    };

    $scope.items = Ratings.select($stateParams.itemId);
});