var Home = angular.module('DemoLoginAPP.Home', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider


        // We can set route here if will use more view like below example
        .when('/Home', {
            templateUrl: '/App/Home/View/Home.html',
            controller: "HomeCtrl"
        })


        //.when('/Dashboard/BlogView/:blogId/:blogName', {
        //    templateUrl: '/App/Dashboard/View/BlogView.html',
        //    controller: 'BlogCtrl',
        //    publicPage: 'true'

        //})
        //.when('/About', {
        //    templateUrl: '/App/Dashboard/View/About.html',
        //    controller: "AboutCtrl"
        //})
        //.when('/Contact', {
        //    templateUrl: '/App/Dashboard/View/Contact.html',
        //    controller: "ContactCtrl"
        //});

}]);