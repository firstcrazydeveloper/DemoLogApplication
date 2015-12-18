angular.module('Security', ['ngCookies'])//'$cookies', '$cookieStore', '$timeout', '$q',$cookies, $cookieStore, $timeout, $q

.factory('SecurityService', ['$http', 'configuration', '$cookies', 'Authenticate', '$location', function ($http, configuration, $cookies, Authenticate, $location) {
   
    var _currentUser={ userName: 'Default', userId: '0', isAuthenticate:false }
    var service = {

        Login: login,
        Logoff: logoff,
        CurrentUser: _currentUser,
        GetCurrentUser: getCurrentUser,
        SetCurrentUser:setCurrentUser
    };

    return service;

    function login(userId, userPassword)
    {
        //var deffered = $q.defer();
        
        //Use promise when call to Web API
        //var loginPromise = AuthenticateSVC.Login(userId, userPassword);
        
        //loginPromise.then(function (response) {
        //_currentUser = response;
        //deffered.resolved(true);
        //}, function (error) {
        //deffered.reject(response.data);
        //});

        _currentUser = Authenticate.Login(userId, userPassword);
       
    }
    function getCurrentUser()
    {
        return _currentUser;
    }
    function setCurrentUser(user)
    {
        _currentUser = user;
    }
    function logoff()
    {
        _currentUser = undefined;
        $location.path('/Login');
        // Here we will call to Web Api to destroy User Session & update logs.
    }
}])



