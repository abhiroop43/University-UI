"use strict";

MetronicApp.controller("UsersController", ["$log", "UserService", function ($log, userService) {
    var userVM = this;
    userVM.getAllUsers = [];
    
    var allUsersPromise = userService.getAllUsers();
    if (allUsersPromise != null) {
        allUsersPromise.then(function (data) {
            $log.debug("Testing  2 3 1", data);
            userVM.getAllUsers = data;
        }, function (err) {
            $log.error("Error while calling user details service", err);
        });
    }
}]);