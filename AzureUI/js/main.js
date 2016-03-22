/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    "restangular"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here

    });
}]);

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '/assets',
        globalPath: '/assets/global',
        layoutPath: '/assets/layouts/layout3'
    };

    $rootScope.settings = settings;
    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', '$rootScope', '$modal', '$log', "$window", "LoginService", "UserService", function($scope, $rootScope, $modal, $log, $window, loginService, userService) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header

        $scope.user = loginService.init();
        //$scope.isUserAdmin = false;
        //$scope.isUserHOD = false;
        //$scope.isUserInstructor = false;
        //$scope.isUserStudent = false;
        var currentUserPromise = userService.getCurrentUser();
        if (currentUserPromise != null) {
            currentUserPromise.then(function(data) {
                $log.debug(data);
                $scope.userDetails = data;
                $window.sessionStorage["userDetails"] = JSON.stringify(data);
                //for (var i = 0; i < $rootScope.userDetails.roles.length; i++)
                //{

                //}
            }, function(err) {
                $log.error("Error while calling user details service", err);
            });
        }
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {        
        Demo.init(); // init theme panel
    });
}]);


/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function ($scope) {
    $scope.date = new Date();
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/*Configure Restangular*/
MetronicApp.config(['RestangularProvider', function(RestangularProvider) {
    //RestangularProvider.setBaseUrl("https://bpdcapisrv.azurewebsites.net/");
    RestangularProvider.setBaseUrl("http://localhost:90/");
    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'text/plain'
        //'X-Requested-With': 'XMLHttpRequest'
        //'Access-Control-Allow-Origin': "*"
    });
    RestangularProvider.setDefaultHttpFields({
        'withCredentials': false,
        'cache': false
    });
    RestangularProvider.setRestangularFields({
        id: '_id.$oid'
    });

    RestangularProvider.setRequestInterceptor(function (elem, operation, what) {
        if (operation === 'put') {
            elem._id = undefined;
            return elem;
        }
        return elem;
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('welcome', {
            url: '/',
            templateUrl: '/views/welcome.html',
            data: { pageTitle: 'Welcome', pageSubTitle: '' },
            controller: "GeneralPageController",
            controllerAs: "GeneralCtrl",
            resolve: {
                deps: [
                    '$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                '/js/controllers/GeneralPageController.js',
                                '/js/services/LoginService.js',
                                '/js/services/UserService.js'
                            ]
                        });
                    }
                ]
            }
        })
        .state('users', {
            url: '/users',
            templateUrl: '/views/users.html',
            data: { pageTitle: 'User Management', pageSubTitle: 'Manage users of the system' },
            controller: "UsersController",
            controllerAs: "UsersCtrl",
            resolve: {
                deps: [
                    '$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                '/js/controllers/UsersController.js'
                            ]
                        });
                    }
                ]
            }
        })
        .state('deps', {
            url: '/deps',
            templateUrl: '/views/departments.html',
            data: { pageTitle: 'Department Management', pageSubTitle: 'Manage departments' },
            controller: "DepsController",
            controllerAs: "DepsCtrl",
            resolve: {
                deps: [
                    '$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                '/js/controllers/DepsController.js'
                            ]
                        });
                    }
                ]
            }
        });


}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);