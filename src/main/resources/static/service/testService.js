(function () {
    'use strict';
    angular
        .module('app')
        .factory('testService', testService);
    testService.$inject = ['$http', '$q'];

    function testService($http, $q) {
        var service = {
            test: test
        };
        return service;

        function test() {
            var deferred = $q.defer();
            $http.get("/verify/getInfo").then(function (resp) {
                deferred.resolve(resp.data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
})();