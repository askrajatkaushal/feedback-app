'use strict';

angular.module('angularRestfulAuth')

<<<<<<< HEAD
.factory('ResourceFactory', ['DS', function (DS) {
    function createDSResource(resourceName, id) {
        if (resourceName != 'questionnaire') {
            return DS.defineResource({
                name: resourceName + 'Resource',
                endpoint: 'api/' + resourceName,
                idAttribute: id
            });
        } else {
            return DS.defineResource({
                name: resourceName + 'Resource',
                endpoint: 'api/' + resourceName,
                idAttribute: id,

                afterInject: function (resource, attrs) {
                    function loadQuestions(item) {
                        console.log("resource", resource);
                        console.log("attrs", attrs);
                        console.log("w/o Slice", item.questions.slice());
                        var qstns = item.questions.slice();
                        item.questions = [];
                        var QuestionsResource = DS.definitions.questionsResource;
                        qstns.forEach(function (qstn) {
                            QuestionsResource.find(qstn).then(function (data) {
                                item.questions.push(data);
                            });
                        });
                    }
                    //deals with findAll()
                    if (attrs instanceof Array) {
                        console.log("Attributes", attrs);
                        attrs.forEach(function (item) {
                            loadQuestions(item);
                        });
                    }
                    //deals with find()
                    else {
                        attrs.questions.forEach(function () {
                            loadQuestions(attrs);
                        });
                    }
                    console.log("afterInject", attrs);
                }
            });
        }
    }

    return {
        users: function () {
            createDSResource('users', '_id')
        },
        authentication: function () {
            createDSResource('authentication')
        },
        signup: function () {
            createDSResource('signup')
        },
        questions: function () {
            return createDSResource('questions', '_id')
        },
        questionnaire: function () {
            createDSResource('questionnaire', '_id')
        }
    };

    var selectedID = {}

    function setID(data) {
        selectedID = data;
    }

    function getID() {
        return selectedID;
    }
}])
=======
.service('UsersService', function (DS) {
    var Users = DS.defineResource({
        name: 'Users',
        idAttribute: '_id',
        endpoint: 'api/users',
    });
    return Users;
})


.service('AuthenticationService', function (DS) {
    return DS.defineResource({
        name: 'AuthenticationResource',
        endpoint: 'api/authenticate',
        idAttribute: 'email'
    });
})


.service('SignupService', function (DS) {
    return DS.defineResource({
        name: 'SignupResource',
        endpoint: 'api/signup',
    });
})


.service('QuestionsService', function (DS) {
    return DS.defineResource({
        name: 'QuestionsResource',
        endpoint: 'api/questions'
    });
})


.service('QuestionnaireService', function (DS, QuestionsService) {
    return DS.defineResource({
        name: 'QuestionnaireResource',
        basePath: "api/",
        endpoint: 'questionnaire',

        afterInject: function (resource, attrs) {
            function loadQuestions(item) {
                console.log("resource", resource);
                console.log("attrs", attrs);
                console.log("w/o Slice", item.questions.slice());
                var qstns = item.questions.slice();
                item.questions = [];
                qstns.forEach(function (qstn) {
                    QuestionsService.find(qstn).then(function (data) {
                        item.questions.push(data);
                    });
                });
            }

            //deals with findAll()
            if (attrs instanceof Array) {
                console.log("Attributes", attrs);
                attrs.forEach(function (item) {
                    loadQuestions(item);
                });
            }
            //deals with find()
            else {
                attrs.questions.forEach(function () {
                    loadQuestions(attrs);
                });
            }

            console.log("afterInject", attrs);
        }
    });

    var saveQuestionnaireID = {}

    function set(data) {
        saveQuestionnaireID = data;
    }

    function get() {
        return saveQuestionnaireID;
    }
    return {
        set: set,
        get: get
    }

})
>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910


.factory('MainService', ['$rootScope', '$http', '$localStorage', '$timeout', '$q', function ($rootScope, $http, $localStorage, $timeout, $q) {
    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function getUserFromToken() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

    var currentUser = getUserFromToken();
<<<<<<< HEAD
=======
    }])

.factory('CRUD', ['$http', function ($http) {
    function createCRUDOps(modelName) {
        var resUrl = baseUrl + '/' + modelName;
        return {
            find: function (id) {
                return $http.get(resUrl + '/' + id);
            },
            findAll: function (page, limit) {
                var config = {
                    params: {}
                };
                if (page) {
                    config.params.page = page;
                }
                if (limit) {
                    config.params.limit = limit
                }
                return $http.get(resUrl, config);
            },
            create: function (data) {
                return $http.post(resUrl, data);
            },
            update: function (id, data) {
                return $http.put(resUrl + '/' + id, data);
            },
            delete: function (id) {
                return $http.delete(resUrl + '/' + id);
            },
            getChildren: function (parentObject, childName) {
                var idArray = parentObject[childName];

                if (typeof idArray !== 'undefined' && idArray instanceof Array) {
                    var promiseArray = idArray.map(function (id) {
                        return $http(baseUrl + '/' + childName + '/' + id);
                    });
                    return $q.all(promiseArray);
                }
                return $q.reject('Child Not found');

            }
        };
    }

    function createDSResource(resourceName) {
        return ds.defineResource({
            name: resourceName + 'Resource',
            //                idAttribute: '_id',
            endpoint: 'api/' + resourceName,
        });
    }

    return {
        users: createDSResource('users'),
        questions: createCRUDOps('questions'),
        questionnaires: createCRUDOps('questionnaires')
    };
>>>>>>> bea17fdb389e18ecbbfd2d92dec02a1774c34910
    }]);
