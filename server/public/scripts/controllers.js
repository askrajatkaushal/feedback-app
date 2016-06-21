'use strict';

/* Controllers */

angular.module('angularRestfulAuth')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'MainService', 'AuthenticationService', 'SignupService', function ($rootScope, $scope, $location, $localStorage, MainService, AuthenticationService, SignupService) {
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

            AuthenticationService.get(inData).then(function (res) {
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

            SignupService.create(inData).then(function (res) {
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

.controller('UsersCtrl', ['$rootScope', '$scope', '$location', 'MainService', 'UsersService', function ($rootScope, $scope, $location, MainService, UsersService) {
    $scope.total = 0;
    $scope.page = 1;
    $scope.limit = 5;

    $scope.pageChanged = function (newPage) {
        UsersService.findAll({
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

.controller('QuestionsCtrl', ['$rootScope', '$scope', '$location', 'QuestionsService', function ($rootScope, $scope, $location, QuestionsService) {
    $scope.total = 0;
    $scope.page = 1;
    $scope.limit = 5;

/*
    QuestionsService.findAll().then(function (res) {
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
*/

    $scope.pageChanged = function (newPage) {
        QuestionsService.findAll(newPage, $scope.limit).then(function (res) {
            $scope.questions = res.data.questions;
            var meta = res.data.meta;
            $scope.meta = meta;
            $scope.limit = meta.limit;
            $scope.total = meta.total;
            $scope.page = meta.page;
        }, function () {
            $rootScope.error = 'Failed to fetch questions';
        });
    };

    $scope.pageChanged($scope.page, $scope.limit);
}])

.controller('QuestionnaireCtrl', ['$rootScope', '$scope', 'QuestionnaireService', function ($rootScope, $scope, QuestionnaireService) {
    $scope.setQID = function (qID) {
        QuestionnaireService.set(qID);
        $location.path("/questionnaire/details");
        //        console.log(qID);
    };

    var qID = QuestionnaireService.get();
    console.log(qID);
    var questionnaires;
    var actualQuestions = [];

    QuestionnaireService.find(qID).then(function (selectedQstnr) {
        console.log("Selected Questionnaire: ", selectedQstnr);
        $scope.questions = selectedQstnr.questions;
    });

    /*
        MainService.questionnaires().then(function (res) {
            questionnaires = res.data.questionnaires;
            console.log(JSON.stringify(questionnaires));
        }, function () {
            questionnaires = null;
        });

        console.log(JSON.stringify(actualQuestions));

        for (var i in questionnaires) {
            var quest = {
                questions: {
                    id: questionnaires[i].id,
                }
            };

            console.log(quest);

            MainService.selectedQuestion(quest).then(function (res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    actualQuestions.push(res.data.questions);
                }
            }, function () {
                $rootScope.error = 'Failed to Fetch Questions';
            });
        }

        $scope.questions = actualQuestions;
    */
}]);
