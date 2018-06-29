(function () {
    'use strict';

    angular
        .module('app.home')
        .factory('CourseService', CourseService);

    CourseService.$inject = ['$http', '$q'];

    function CourseService($http, $q) {
        var service = {

            getCourse: getCourse,
            saveCourse: saveCourse,
            deleteCourse: deleteCourse,

            getCourseClass: getCourseClass,
            saveCourseClass: saveCourseClass,
            deleteCourseClass: deleteCourseClass,

            getStuCourse: getStuCourse,
            saveStuCourse: saveStuCourse,
            deleteStuCourse: deleteStuCourse,

            saveStatus: saveStatus,
            getStatus: getStatus,

            getStuCourseCount: getStuCourseCount,
            findInDetailCanChoose: findInDetailCanChoose

        };

        return service;

        function getCourse(data) {
            var deferred = $q.defer();
            $http.post("/getCourse", data).then(function (resp) {
                console.log("getCourse", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function saveCourse(data) {
            var deferred = $q.defer();
            $http.post("/saveCourse", data).then(function (resp) {
                console.log("saveCourse", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function deleteCourse(data) {
            var deferred = $q.defer();
            $http.post("/deleteCourse", data).then(function (resp) {
                console.log("deleteCourse", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function getCourseClass(data) {
            var deferred = $q.defer();
            $http.post("/getCourseClass", data).then(function (resp) {
                console.log("getCourseClass", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function saveCourseClass(data) {
            var deferred = $q.defer();
            $http.post("/saveCourseClass", data).then(function (resp) {
                console.log("saveCourseClass", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function deleteCourseClass(data) {
            var deferred = $q.defer();
            $http.post("/deleteCourseClass", data).then(function (resp) {
                console.log("deleteCourseClass", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function getStuCourse(data) {
            var deferred = $q.defer();
            $http.post("/getStuCourse", data).then(function (resp) {
                console.log("getStuCourse", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function saveStuCourse(data) {
            var deferred = $q.defer();
            $http.post("/saveStuCourse", data).then(function (resp) {
                console.log("saveStuCourse", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function deleteStuCourse(data) {
            var deferred = $q.defer();
            $http.post("/deleteStuCourse", data).then(function (resp) {
                console.log("deleteStuCourse", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function saveStatus(data) {
            var deferred = $q.defer();
            $http.post("/saveStatus", data).then(function (resp) {
                console.log("saveStatus", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function getStatus() {
            var deferred = $q.defer();
            $http.get("/getStatus").then(function (resp) {
                console.log("getStatus", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function getStuCourseCount(data) {
            var deferred = $q.defer();
            $http.post("/getStuCourseCount", data).then(function (resp) {
                console.log("getStuCourseCount", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function findInDetailCanChoose(data) {
            var deferred = $q.defer();
            $http.post("/findInDetailCanChoose", data).then(function (resp) {
                console.log("findInDetailCanChoose", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

    }
})();
