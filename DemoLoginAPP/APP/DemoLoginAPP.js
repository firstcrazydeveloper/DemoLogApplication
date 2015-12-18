angular.module('DemoLoginAPP', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'WebAPIService', 'Security', 'DemoLoginAPP.Home', 'DemoLoginAPP.Configuration', 'ngGrid', 'ngCookies'])

.factory('DemoLoginAPPFactory', ['$location', '$filter', '$timeout', '$modal', function ($location, $filter, $timeout, $modal) {
    var title = 'Demo Login Application';
    var contenLoading = true;
    return {
        GetPageTitle: function () { return title; },
        SetPageTitle: function (value) { title = value; },
        SetContentLoading: function (value) { contenLoading = value; },
        GetContentLoading: function () { return contenLoading; }
    }

}])
.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {




    $routeProvider.when('/', {
        templateUrl: '/App/Home/View/Login.html',
        controller: "LoginCtrl"
    })
    .when('/Login', {
        templateUrl: '/App/Home/View/Login.html',
        controller: "LoginCtrl"
    });
    $locationProvider.html5Mode(false);


}])

.controller('MainAPPCtrl', ['$scope', 'DemoLoginAPPFactory', '$rootScope','SecurityService', function ($scope, DemoLoginAPPFactory, $rootScope,SecurityService) {


    $scope.DemoLoginAPPFactory = DemoLoginAPPFactory;
   
    $scope.SecurityService = SecurityService;



}])

.directive('ccSidebar', function () {
    // Opens and clsoes the sidebar menu.
    // Usage:
    //  <div data-cc-sidebar>
    // Creates:
    //  <div data-cc-sidebar class="sidebar">
    var directive = {
        link: link,
        restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
        var $sidebarInner = element.find('.sidebar-inner');
        var $dropdownElement = element.find('.sidebar-dropdown a');
        element.addClass('sidebar');
        $dropdownElement.click(dropdown);

        function dropdown(e) {
            var dropClass = 'dropy';
            e.preventDefault();
            if (!$dropdownElement.hasClass(dropClass)) {
                hideAllSidebars();
                $sidebarInner.slideDown(350);
                $dropdownElement.addClass(dropClass);
            } else if ($dropdownElement.hasClass(dropClass)) {
                $dropdownElement.removeClass(dropClass);
                $sidebarInner.slideUp(350);
            }

            function hideAllSidebars() {
                $sidebarInner.slideUp(350);
                $('.sidebar-dropdown a').removeClass(dropClass);
            }
        }
    }
});




