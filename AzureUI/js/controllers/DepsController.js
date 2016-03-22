"use strict";

MetronicApp.controller("DepsController", ["$log", "$window", "DepService", "LoginService", depsController]);

function depsController($log, $window, depService, loginService) {
    var depVM = this;
    depVM.getAllDeps = [];
    //check if valid user session//
    depVM.isLoggedIn = loginService.init();
    depVM.userDetails = JSON.parse($window.sessionStorage["userDetails"]);
    $log.debug("DepsController: UserDetails: ", depVM.userDetails);
    if (depVM.isLoggedIn == null || depVM.userDetails.roles.indexOf("Admin") <= -1) {
        $state.go("welcome");
    }
    
    var allDepsPromise = depService.getAllDeps();
    if (allDepsPromise != null) {
        allDepsPromise.then(function (data) {
            $log.debug("Testing get all departments", data);
            depVM.getAllDeps = data;
        }, function (err) {
            $log.error("Error while calling department details service", err);
        });
    }
}