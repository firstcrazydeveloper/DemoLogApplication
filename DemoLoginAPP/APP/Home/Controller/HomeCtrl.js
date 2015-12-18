var HomeCtrl = Home.controller('HomeCtrl', ['$rootScope', '$scope', '$filter', 'constants', 'DemoLoginAPPFactory', 'SecurityService', function ($rootScope, $scope, $filter, constants, DemoLoginAPPFactory, SecurityService) {


    // Scope level variable declartion 
    var currentUser = SecurityService.GetCurrentUser();
    var currentUser = SecurityService.GetCurrentUser();
    $scope.UserName = currentUser.userName;
    $scope.UserId = currentUser.userId;

    // End Scope level variable declartion


    // Scope level function declartion

   

    // End Scope level function declartion


 

}])