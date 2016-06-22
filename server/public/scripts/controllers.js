'use strict';

/* Controllers */

angular.module('angularRestfulAuth')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'MainService', 'ResourceFactory', function ($rootScope, $scope, $location, $localStorage, MainService, ResourceFactory) {
        var changeLocation = function (url, replace, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) {
                window.location = url;
            }
            if (replace) {
                $location.path(url).replace();
            } else {
                //this this if you want to change the URL and add it to the history stack
                $location.path(url);

            }
        };

        $scope.signin = function () {
            var inData = {
                user: {
                    email: $scope.email,
                    password: $scope.password
                }
            };

            ResourceFactory.users().get(inData).then(function (res) {
                console.log("Signing in.");

                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    $rootScope.token = $localStorage.token;
                    $rootScope.currentUser = res.data.user;
                    MainService.changeUser(res.data.user);
                    changeLocation('#/users', true, false);
                }
            }, function () {
                $rootScope.error = 'Failed to signin';
            });
        };

        $scope.signup = function () {
            var inData = {
                user: {
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    email: $scope.email,
                    password: $scope.password
                }
            };

            ResourceFactory.signup().create(inData).then(function (res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    alert("Signed up. Please Login");
                    changeLocation('#/signin', true, false);
                }
            }, function () {
                $rootScope.error = 'Failed to signup';
            });
        };


        $scope.logout = function () {
            MainService.logout(function () {
                delete $rootScope.token;
                delete $rootScope.currentUser;
                changeLocation('#/');
            }, function () {
                alert("Failed to logout!");
            });
        };
        $rootScope.token = $localStorage.token;
    }])

.controller('UsersCtrl', ['$rootScope', '$scope', '$location', 'MainService', 'ResourceFactory', function ($rootScope, $scope, $location, MainService, ResourceFactory) {
    $scope.total = 0;
    $scope.page = 1;
    $scope.limit = 5;

    $scope.pageChanged = function (newPage) {
        ResourceFactory.users().findAll({
            page: newPage,
            limit: $scope.limit
        }).then(function (res) {
            var meta = res.data.meta;
            $scope.meta = meta;
            $scope.limit = meta.limit;
            $scope.total = meta.total;
            $scope.page = meta.page;

            $rootScope.currentUser = MainService.getCurrentUser();
            $scope.users = res.data.users;
        }, function () {
            $rootScope.error = 'Failed to fetch users';
        });
    };

    $scope.pageChanged($scope.page, $scope.limit);

    }])

.controller('QuestionsCtrl', ['$rootScope', '$scope', '$location', 'ResourceFactory', function ($rootScope, $scope, $location, ResourceFactory) {
    $scope.total = 0;
    $scope.page = 1;
    $scope.limit = 5;


    ResourceFactory.questions().findAll().then(function (res) {
            $scope.questions = res.data.questions;
            var meta = res.data.meta;
            $scope.meta = meta;
            $scope.limit = meta.limit;
            $scope.total = meta.total;
            $scope.page = meta.page;
        },
        function () {
            $rootScope.error = 'Failed to fetch questions';
        }
    );

    $scope.pageChanged = function (newPage) {
        ResourceFactory.questions().then(function(resourceResponse) {
            resourceResponse.findAll(newPage, $scope.limit).then(function (res) {
                $scope.questions = res.data.questions;
                var meta = res.data.meta;
                $scope.meta = meta;
                $scope.limit = meta.limit;
                $scope.total = meta.total;
                $scope.page = meta.page;
            }, function () {
                $rootScope.error = 'Failed to fetch questions';
            });
        });
    };

    $scope.pageChanged($scope.page, $scope.limit);
}])

.controller('QuestionnaireCtrl', ['$rootScope', '$scope', 'ResourceFactory', function ($rootScope, $scope, ResourceFactory) {
/*
    $scope.setQID = function (qID) {
        ResourceFactory.setID(qID);
        $location.path("/questionnaire/details");
        //        console.log(qID);
    };

    var qID = ResourceFactory.getID();
    console.log(qID);
    var questionnaires;
    var actualQuestions = [];
*/

    ResourceFactory.questionnaire().findAll().then(function (res) {
            $scope.questionnaires = res.data.questionnaire;
            var meta = res.data.meta;
            $scope.meta = meta;
            $scope.limit = meta.limit;
            $scope.total = meta.total;
            $scope.page = meta.page;
        },
        function () {
            $rootScope.error = 'Failed to fetch questions';
        }
    );

    ResourceFactory.questionnaire().find(qID).then(function (selectedQstnr) {
        console.log("Selected Questionnaire: ", selectedQstnr);
        $scope.questions = selectedQstnr.questions;
    });
}]);
