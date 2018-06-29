(function () {
    'use strict';
    angular
        .module('app')
        .factory('jwtService', jwtService);
    jwtService.$inject = ['$http', '$localStorage', '$sessionStorage', '$q'];

    function jwtService($http, $localStorage, $sessionStorage, $q) {
        //登录
        function login(loginDetail) {
            var deferred = $q.defer();
            var data = {
                username: loginDetail.username,
                password: loginDetail.password,
                permission: loginDetail.permission

            };
            $http.post("/login", data).then(function (resp) {
                var bearerToken = resp.headers('Authorization');
                if (bearerToken.slice(0, 7) === 'Bearer ') {
                    var jwt = bearerToken.slice(7, bearerToken.length);
                    console.log(loginDetail);
                    storeAuthenticationToken(jwt);
                }
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        //带着Token登陆
        function loginWithToken(jwt, rememberMe) {
            var deferred = $q.defer();

            if (angular.isDefined(jwt)) {
                this.storeAuthenticationToken(jwt, rememberMe);
                deferred.resolve(jwt);
            } else {
                deferred.reject();
            }

            return deferred.promise;
        }

        //判断是否为记住密码
        function storeAuthenticationToken(jwt, rememberMe) {
            if (rememberMe) {
                $localStorage.authenticationToken = jwt;
            } else {
                $sessionStorage.authenticationToken = jwt;
            }
        }

        //注销
        function logout() {
            delete $localStorage.authenticationToken;
            delete $sessionStorage.authenticationToken;
        }

        //获取用户对象
        function getUser() {
            var deferred = $q.defer();

            $http.get('api/getUser').then(function (resp) {
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        //认证
        function authenticated() {
            var deferred = $q.defer();

            $http.get(baseUrl + 'api/authenticated').then(function (resp) {
                deferred.resolve(resp);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        return {
            login: login,
            logout: logout,
            loginWithToken: loginWithToken,
            authenticated: authenticated,
            getUser: getUser
        };

    }


})();