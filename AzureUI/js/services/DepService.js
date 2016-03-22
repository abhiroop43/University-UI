"use strict";

MetronicApp.factory("DepService", [
    "$log", "Restangular", "LoginService", function($log, Restangular, loginService) {
        var userCredentials = loginService.init();

        return {
            getAllDeps: function() {
                if (userCredentials != null && userCredentials.token != null) {
                    return Restangular.all("api/departments/getAll").getList({}, { "authorization": "bearer " + userCredentials.token });
                }
            }
        }
    }
]);