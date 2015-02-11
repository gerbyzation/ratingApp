app.controller('ListCtrl', function ($scope, $rootScope, Ratings) {
    
    $scope.selectAll = Ratings.selectAll();

});

app.controller('ListDetailCtrl', function ($scope, $rootScope, $stateParams, $ionicModal, Ratings) {

    $scope.ratings = $rootScope.ratings;
    $scope.item = {};
    $scope.select = function () {

        // SQL ID is not zero-based, subtract 1 from ID to get index
        $scope.item = $scope.ratings[$stateParams.itemId-1];
        console.log($scope.ratings[$stateParams.itemId-1]);

    }();

    $scope.edit = false;

    $scope.switchEditMode = function () {
        // $scope.ratings[2].name = "Sjaak";
        // console.log($scope.ratings[2].name);
        $scope.edit = !$scope.edit;
    };

    // modal stuff
    $ionicModal.fromTemplateUrl('templates/modal-edit.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        console.log('modal created');
        $scope.modal = modal;
    });

    $scope.openEdit = function () {
        console.log($scope);
        $scope.modal.show();
    };

    $scope.closeEdit = function () {
        $scope.modal.hide();
    };

    // clean up the modal once done
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    $scope.$on('modal.hidden', function () {
        console.log('modal hidden');
        // execute actoin
    });

    $scope.$on('modal.removed', function () {
        console.log('modal removed');
        // execute action
    });
});