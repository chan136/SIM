(function () {
    'use strict';

    angular
        .module('app.home')
        .factory('StudentService', StudentService);

    StudentService.$inject = ['$http', '$q'];

    function StudentService($http, $q) {
        var service = {
            getStuInfo: getStuInfo,
            updateStu: updateStu,
            deleteInfo: deleteInfo,

            SaveStu: SaveStu,
            saveScore: saveScore,
            getScore: getScore,
            deleteScore: deleteScore,

            getCourseTable: getCourseTable,
            saveCourseTable: saveCourseTable,
            deleteCourseTable: deleteCourseTable,

            getCourseTableInfo:getCourseTableInfo,
            findPersonInDetail:findPersonInDetail,

            upload:upload,
            getFileName:getFileName,

            getStudentInfoScore:getStudentInfoScore

        };

        return service;

        function getStuInfo(data) {
            var deferred = $q.defer();
            $http.post("/getStudent", data).then(function (resp) {
                console.log("getStudent", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function updateStu(data) {
            var deferred = $q.defer();
            $http.post("/saveStudent", data).then(function (resp) {
                console.log("saveStudent", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        function SaveStu(data) {
            var deferred = $q.defer();
            $http.post("/saveStudent", data).then(function (resp) {
                console.log("saveStudent", resp);
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

        function deleteInfo(data) {
            var deferred = $q.defer();
            $http.post("/deleteStudentByStuNo", data).then(function (resp) {
                console.log("deleteStudentByStuNo", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function getScore(data) {
            var deferred = $q.defer();
            $http.post("/getScore", data).then(function (resp) {
                console.log("getScore", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function deleteScore(data) {
            var deferred = $q.defer();
            $http.post("/deleteScore", data).then(function (resp) {
                console.log("deleteScore", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function saveScore(data) {
            var deferred = $q.defer();
            $http.post("/saveScore", data).then(function (resp) {
                console.log("saveScore", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function getCourseTable(data) {
            var deferred = $q.defer();
            $http.post("/getCourseTable", data).then(function (resp) {
                console.log("getCourseTable", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function saveCourseTable(data) {
            var deferred = $q.defer();
            $http.post("/saveCourseTable", data).then(function (resp) {
                console.log("saveCourseTable", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function deleteCourseTable(data) {
            var deferred = $q.defer();
            $http.post("/deleteCourseTable", data).then(function (resp) {
                console.log("deleteCourseTable", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function getCourseTableInfo(data) {
            var deferred = $q.defer();
            $http.post("/getCourseTableInfo", data).then(function (resp) {
                console.log("getCourseTableInfo", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function upload(data) {
            var deferred = $q.defer();
            $http.post("/upload", data).then(function (resp) {
                console.log("upload", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function getFileName(data) {
            var deferred = $q.defer();
            $http.post("/getFileName", data).then(function (resp) {
                console.log("getFileName", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function getStudentInfoScore(data) {
            var deferred = $q.defer();
            $http.post("/getStudentInfoScore", data).then(function (resp) {
                console.log("getStudentInfoScore", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        function findPersonInDetail(data) {
            var deferred = $q.defer();
            $http.post("/findPersonInDetail", data).then(function (resp) {
                console.log("findPersonInDetail", resp);
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

    }
})();
