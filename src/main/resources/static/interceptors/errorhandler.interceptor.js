(function () {
    'use strict';

    angular
        .module('app')
        .factory('errorHandlerInterceptor', errorHandlerInterceptor);

    errorHandlerInterceptor.$inject = ['$q', '$localStorage', '$sessionStorage', '$injector'];

    function errorHandlerInterceptor($q, $localStorage, $sessionStorage, $injector) {
        var service = {
            responseError: responseError
        };

        return service;

        function responseError(response) {
            if (response.status === 401) {
                delete $localStorage.authenticationToken;
                delete $sessionStorage.authenticationToken;
                var state = $injector.get("$state");
                alert("您还没有登录，请先登录！");
                state.go("login");

            }
            return $q.reject(response);
        }
    }
})();
