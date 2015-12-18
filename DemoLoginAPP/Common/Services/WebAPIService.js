angular.module('WebAPIService', ['ngResource'])

.factory('DemoLoginAPPAPI', ['$http', 'configuration', function ($http, configuration) {


    var DemoLoginAPPSVC = function () {

    };


    //DemoLoginAPPSVC.


    DemoLoginAPPSVC.GetListing = function () {

        //dummy app so here I am returning hardcore value but here we can call web api service. Example code for Web Api commented below

        //alert(configuration.API_URL + 'Listing');
        return $http.get(configuration.API_URL + 'Blog').then(function (response) {

            return response.data;

        });
    };

    DemoLoginAPPSVC.GetBlogDetails = function (Id) {

        //dummy app so here I am returning hardcore value but here we can call web api service. Example code for Web Api commented below
        console.log(configuration.API_URL + 'Blog/' + Id);
        //alert(configuration.API_URL + 'Listing');
        return $http.get(configuration.API_URL + 'Blog/' + Id).then(function (response) {

            return response.data;

        });
    };

    DemoLoginAPPSVC.GetBlogListByBlogType = function (Id) {

        //dummy app so here I am returning hardcore value but here we can call web api service. Example code for Web Api commented below

        //alert(configuration.API_URL + 'Listing');
        return $http.get(configuration.API_URL + 'Blog/' + Id + '/BlogType').then(function (response) {

            return response.data;

        });
    };

    return DemoLoginAPPSVC;
}])
.factory('Authenticate', ['$http', 'configuration', function ($http, configuration) {


    var AuthenticateSVC = function () {

    };


    AuthenticateSVC.Login = function (userId, userPassword) {
        var paramData = {
            "UserId": userId,
            "UserPassword": userPassword
        };
       

        // returning hard code value
        if (userId == 777 && userPassword=='password')
            return { userName: 'Abhishek Kumar', userId: '101', isAuthenticate: true }
        else
            return { userName: '', userId: '', isAuthenticate: false }
        // sample code to call Web API to Validate User
        //return $http.post(configuration.API_URL + 'OuthTokens/', paramData).then(function (response) {
        //    return response;

        //});
    };


   

    return AuthenticateSVC;
}])