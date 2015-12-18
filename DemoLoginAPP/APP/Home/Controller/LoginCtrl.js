var LoginCtrl = Home.controller('LoginCtrl', ['$rootScope', '$scope', 'DemoLoginAPPAPI', '$filter', 'constants', 'DemoLoginAPPFactory', 'SecurityService', '$location', function ($rootScope, $scope, DemoLoginAPPAPI, $filter, constants, DemoLoginAPPFactory, SecurityService,$location) {

   
    // Scope level variable declartion 
    $scope.lblUserName = 'User Id';
    $scope.lblPassword = 'Password';
    $scope.error = '';
    $scope.userId = '';
    $scope.password = '';
    


    // End Scope level variable declartion


    // Scope level function declartion

    $scope.Login = function () {

        //This code use when we will call actual Web API Service
        //var loginPromise = SecurityService.login($scope.userId, $scope.password);
        //loginPromise.then(function (response) {
        //Sample implement logic
        //}, function (error) {
        //Handle error code
        //});
        $scope.error = '';
        SecurityService.Login($scope.userId, $scope.password);
        var currentUser = SecurityService.GetCurrentUser();

        if (currentUser.isAuthenticate)
        {
            $location.path('/Home');
        }
        else
        {
            $scope.error = "Invalid user id & password. Try again."
            $scope.userId = '';
            $scope.password = '';

        }

    };

    // End Scope level function declartion



}])