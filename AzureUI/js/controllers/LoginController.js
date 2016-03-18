"use strict";

MetronicApp.controller("LoginController", [
    "$log", "LoginService", function ($log, loginService) {
        var login = this;
        login.date = new Date();
        $log.log("Inside login controller");

        var doLogin = function(username, password) {

        };
    }
]);