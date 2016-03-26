"use strict";

MetronicApp.controller("UsersController", ["$log", "$state", "$window", "UserService", "LoginService", function ($log, $state, $window, userService, loginService) {
    var userVM = this;
    userVM.getAllUsers = [];

    //check if valid user session//
    userVM.isLoggedIn = loginService.init();
    userVM.userDetails = JSON.parse($window.sessionStorage["userDetails"]);
    $log.debug("UsersController: UserDetails: ", userVM.userDetails);
    if (userVM.isLoggedIn == null || userVM.userDetails.roles.indexOf("Admin") <= -1) {
        $state.go("welcome");
    }
    
    var allUsersPromise = userService.getAllUsers();
    if (allUsersPromise != null) {
        allUsersPromise.then(function (data) {
            $log.debug("Testing get all users", data);
            userVM.getAllUsers = data;
        }, function (err) {
            $log.error("Error while calling get all users service", err);
        });
    }
}]);