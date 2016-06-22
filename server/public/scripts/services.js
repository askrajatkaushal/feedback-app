'use strict';

angular.module('angularRestfulAuth')

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
    }]);
