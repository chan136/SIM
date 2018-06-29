(function () {
    'use strict';
    angular
        .module('app')
        .service('LoginService', LoginService);
    LoginService.$inject = ['jwtService'];

    function LoginService(jwtService) {

        function login(data) {
            return jwtService.login(data);
        }

        function authenticated() {
            return jwtService.authenticated();
        }

        function getUser() {
            return jwtService.getUser();
        }

        function loginWithToken(jwt, rememberMe) {
            return jwtService.loginWithToken(jwt, rememberMe);
        }

        function logout() {
            jwtService.logout();
        }

        return {
            login: login,
            logout: logout,
            loginWithToken: loginWithToken,
            authenticated: authenticated,
            getUser: getUser
        }

    }


})();