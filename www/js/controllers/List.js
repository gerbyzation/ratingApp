app.controller('ListCtrl', function ($scope, $rootScope, Ratings) {
    
    $scope.selectAll = Ratings.selectAll();

});

app.controller('ListDetailCtrl', function ($scope, $rootScope, $stateParams, $ionicModal, Ratings, Camera) {

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
        Ratings.update($scope.item.name, $scope.item.URI, $scope.item.loc, $scope.item.criteria, $scope.item.rating, $scope.item.ID);
        $scope.ratings[$scope.item.ID -1] = $scope.item;
        $scope.edit = false;
    };

    $scope.getPicture = function () {
        $scope.item.URI = Camera.getPicture();
    };

});