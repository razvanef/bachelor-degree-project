function UserInfoController($rootScope, $scope, $mdDialog, userGigService) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
    $scope.sexlist = ['F', 'M'];

    $scope.getUserInfo = function () {
        userGigService.getUser($rootScope.user.userId).then(
                function (response) {
                    console.log(response.data);
                    $scope.user = response.data;
                    $scope.user.bornDate = new Date($scope.user.bornDate);
                },
                function (reason) {

                });
    };
    $scope.postUserInfo = function () {
        $scope.user.id = $rootScope.user.userId;
        angular.forEach($scope.user, function (value, key) {
            if(value===null) {
                delete $scope.user[key];
            };
        });
        console.log($scope.user);
        userGigService.postUser($scope.user).then(
                function (response) {
                    console.log(response.data);
                    $scope.user = response.data;
                },
                function (reason) {

                });
    };

    $scope.getUserInfo();
}
;
