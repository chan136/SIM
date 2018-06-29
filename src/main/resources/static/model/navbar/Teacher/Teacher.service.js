(function () {
    'use strict';

    angular
        .module('app.home')
        .factory('TeacherService', TeacherService);

    TeacherService.$inject = ['$http', '$q'];

    function TeacherService($http, $q) {
        var service = {
            getTeacher: getTeacher,
            saveTeacher: saveTeacher,
            deleteTeacher: deleteTeacher,

            getTeaClass:getTeaClass,
            saveTeaClass:saveTeaClass,
            deleteTeaClass:deleteTeaClass,

            getTeaCourse:getTeaCourse,
            saveTeaCourse:saveTeaCourse,
            deleteTeaCourse:deleteTeaCourse
        };

        return service;

        function getTeacher(data) {
            var deferred = $q.defer();
            $http.post("/getTeacher", data).then(function (resp) {
                console.log("getTeacher", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function saveTeacher(data) {
            var deferred = $q.defer();
            $http.post("/saveTeacher", data).then(function (resp) {
                console.log("saveTeacher", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function deleteTeacher(data) {
            var deferred = $q.defer();
            $http.post("/deleteTeacher", data).then(function (resp) {
                console.log("deleteTeacher", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function getTeaClass(data) {
            var deferred = $q.defer();
            $http.post("/getTeaClass", data).then(function (resp) {
                console.log("getTeaClass", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function saveTeaClass(data) {
            var deferred = $q.defer();
            $http.post("/saveTeaClass", data).then(function (resp) {
                console.log("saveTeaClass", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function deleteTeaClass(data) {
            var deferred = $q.defer();
            $http.post("/deleteTeaClass", data).then(function (resp) {
                console.log("deleteTeaClass", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function getTeaCourse(data) {
            var deferred = $q.defer();
            $http.post("/getTeaCourse", data).then(function (resp) {
                console.log("getTeaCourse", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function saveTeaCourse(data) {
            var deferred = $q.defer();
            $http.post("/saveTeaCourse", data).then(function (resp) {
                console.log("saveTeaCourse", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function deleteTeaCourse(data) {
            var deferred = $q.defer();
            $http.post("/deleteTeaCourse", data).then(function (resp) {
                console.log("deleteTeaCourse", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

    }
})();
