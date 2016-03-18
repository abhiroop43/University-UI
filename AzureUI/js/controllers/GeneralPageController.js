/* Setup general page controller */
angular.module("MetronicApp").controller("GeneralPageController", ["$rootScope", "$window", "$modal", "$log", "settings", "LoginService", "UserService", function ($rootScope, $window, $modal, $log, settings, loginService, userService) {
    var welcome = this;
    //$scope.$on("$viewContentLoaded", function () {
    //	// initialize core components
    //	App.initAjax();

    //	// set default layout mode
    //	$rootScope.settings.layout.pageContentWhite = true;
    //    $rootScope.settings.layout.pageBodySolid = false;
    //    $rootScope.settings.layout.pageSidebarClosed = false;

        
    //});
    welcome.username = loginService.init();

    welcome.open = function (size) {
        var modalInstance = $modal.open(
        {
            templateUrl: "/views/login.html",
            controller: "LoginController",
            controllerAs: "loginCtrl",
            size: size
        });
        modalInstance.result.then(function () {
            //$log.info("Inside modal promise");
            $window.location.reload();
            //$state.go($state.current, {}, { reload: true });
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
        //$state.reload();
    };
    
    //if (welcome.username != null) {
    //    userService.getCurrentUser().then(function(data) {
    //        $log.log(data);
    //        $rootScope.userDetails = data;
    //    }, function(err) {
    //        $log.error("Error while calling user details service", err);
    //    });
    //}
}]);
