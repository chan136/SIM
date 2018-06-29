(function () {
    'use strict';

    angular
        .module('app.home')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$q'];

    function UserService($http, $q) {
        var service = {

            getUser: getUser,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            updatePassword:updatePassword

        };

        return service;

        function getUser(data) {
            var deferred = $q.defer();
            $http.post("/getUser", data).then(function (resp) {
                console.log("getUser", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function addUser(data) {
            var deferred = $q.defer();
            $http.post("/addUser", data).then(function (resp) {
                console.log("addUser", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function updateUser(data) {
            var deferred = $q.defer();
            $http.post("/updateUser", data).then(function (resp) {
                console.log("updateUser", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function updatePassword(data) {
            var deferred = $q.defer();
            $http.post("/updatePassword", data).then(function (resp) {
                console.log("updatePassword", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function deleteUser(data) {
            var deferred = $q.defer();
            $http.post("/deleteUser", data).then(function (resp) {
                console.log("deleteUser", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function updatePassword(data) {
            var deferred = $q.defer();
            $http.post("/updatePassword", data).then(function (resp) {
                console.log("updatePassword", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };


    }
})();
