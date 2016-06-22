'use strict';

/* Controllers */

angular.module('angularRestfulAuth')
<<<<<<< HEAD
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'MainService', 'ResourceFactory', function ($rootScope, $scope, $location, $localStorage, MainService, ResourceFactory) {
=======
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'MainService', 'AuthenticationService', 'SignupService', function ($rootScope, $scope, $location, $localStorage, MainService, AuthenticationService, SignupService) {
>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910
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
<<<<<<< HEAD
=======

>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910
        };

        $scope.signin = function () {
            var inData = {
                user: {
                    email: $scope.email,
                    password: $scope.password
                }
            };

<<<<<<< HEAD
            ResourceFactory.users().get(inData).then(function (res) {
=======
            AuthenticationService.get(inData).then(function (res) {
>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910
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

<<<<<<< HEAD
            ResourceFactory.signup().create(inData).then(function (res) {
=======
            SignupService.create(inData).then(function (res) {
>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910
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

<<<<<<< HEAD
.controller('UsersCtrl', ['$rootScope', '$scope', '$location', 'MainService', 'ResourceFactory', function ($rootScope, $scope, $location, MainService, ResourceFactory) {
=======
.controller('UsersCtrl', ['$rootScope', '$scope', '$location', 'MainService', 'UsersService', function ($rootScope, $scope, $location, MainService, UsersService) {
>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910
    $scope.total = 0;
    $scope.page = 1;
    $scope.limit = 5;

    $scope.pageChanged = function (newPage) {
<<<<<<< HEAD
        ResourceFactory.users().findAll({
=======
        UsersService.findAll({
>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910
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

<<<<<<< HEAD
.controller('QuestionsCtrl', ['$rootScope', '$scope', '$location', 'ResourceFactory', function ($rootScope, $scope, $location, ResourceFactory) {
=======
.controller('QuestionsCtrl', ['$rootScope', '$scope', '$location', 'QuestionsService', function ($rootScope, $scope, $location, QuestionsService) {
>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910
    $scope.total = 0;
    $scope.page = 1;
    $scope.limit = 5;

<<<<<<< HEAD

    ResourceFactory.questions().findAll().then(function (res) {
=======
/*
    QuestionsService.findAll().then(function (res) {
>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910
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
<<<<<<< HEAD

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
=======
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
>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910
        });
    };

    $scope.pageChanged($scope.page, $scope.limit);
}])

<<<<<<< HEAD
.controller('QuestionnaireCtrl', ['$rootScope', '$scope', 'ResourceFactory', function ($rootScope, $scope, ResourceFactory) {
/*
    $scope.setQID = function (qID) {
        ResourceFactory.setID(qID);
=======
.controller('QuestionnaireCtrl', ['$rootScope', '$scope', 'QuestionnaireService', function ($rootScope, $scope, QuestionnaireService) {
    $scope.setQID = function (qID) {
        QuestionnaireService.set(qID);
>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910
        $location.path("/questionnaire/details");
        //        console.log(qID);
    };

<<<<<<< HEAD
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
=======
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
>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910
}]);
