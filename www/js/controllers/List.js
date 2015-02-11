app.controller('ListCtrl', function ($scope, $rootScope, Ratings) {
    
    $scope.selectAll = Ratings.selectAll();

});

app.controller('ListDetailCtrl', function ($scope, $stateParams, $ionicModal, Ratings) {

    $scope.select = Ratings.select($stateParams.itemId);

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