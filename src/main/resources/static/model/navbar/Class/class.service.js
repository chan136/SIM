(function () {
    'use strict';

    angular
        .module('app.home')
        .factory('ClassService', ClassService);

    ClassService.$inject = ['$http', '$q'];

    function ClassService($http, $q) {
        var service = {

            getClass: getClass,
            saveClass: saveClass,
            deleteClass: deleteClass

        };

        return service;

        function getClass(data) {
            var deferred = $q.defer();
            $http.post("/getClass", data).then(function (resp) {
                console.log("getClass", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function saveClass(data) {
            var deferred = $q.defer();
            $http.post("/saveClass", data).then(function (resp) {
                console.log("saveClass", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function deleteClass(data) {
            var deferred = $q.defer();
            $http.post("/deleteClass", data).then(function (resp) {
                console.log("deleteClass", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

    }
})();
