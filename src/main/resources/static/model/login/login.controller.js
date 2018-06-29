(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('loginController', loginController);

    loginController.$inject = ['$state', 'LoginService', '$rootScope', 'toaster', 'testService','$scope'];

    function loginController($state, LoginService, $rootScope, toaster, testService,$scope) {
        function notify(type, title, message) {
            toaster.pop(type, title, message);
        }

        var vm = this;
        vm.login = login;
        $rootScope.loginValue = true;
        $rootScope.adminValue = false;
        $rootScope.studentValue = false;
        $rootScope.teacherValue = false;
        // $rootScope.alertValue = false;
        // $rootScope.loginValue1 = false;
        vm.user = {
            username:"",
            password:"",
            permission:""
        };

        function login(e) {
            var obj = document.getElementsByName("identity");
            for(var i   =   0;   i   <   obj.length;   i++)    {
                if(obj[i].checked)    {
                    console.log(obj[i].value)
                    vm.user.permission= obj[i].value
                }
            }

            console.log(vm.user);
            LoginService.login(vm.user).then(function (resp) {
                console.log(resp);
                testService.test().then(function (resp) {
                    console.log('resp',resp);
                    sessionStorage.setItem("userdata",JSON.stringify(resp));
                    var userdata=JSON.parse(sessionStorage.getItem("userdata"));//对象
                    console.log('userdata',userdata);
                    if(userdata){
                        $rootScope.LUser = userdata;
                        console.log("LUser", $rootScope.LUser);
                        if (userdata.permission === "admin") {
                            $rootScope.loginValue = false;
                            $rootScope.adminValue = true;
                            $rootScope.teacherValue = false;
                            $rootScope.studentValue = false;
                        }else if(userdata.permission === "teacher"){
                            $rootScope.loginValue = false;
                            $rootScope.adminValue = false;
                            $rootScope.teacherValue = true;
                            $rootScope.studentValue = false;
                        }else if(userdata.permission === "student"){
                            $rootScope.loginValue = false;
                            $rootScope.adminValue = false;
                            $rootScope.teacherValue = false;
                            $rootScope.studentValue = true;
                        }  else {
                            $rootScope.loginValue = true;
                            $rootScope.adminValue = false;
                            $rootScope.teacherValue = false;
                            $rootScope.studentValue = false;
                        }
                    }

                });
                $rootScope.$broadcast('authenticationSuccess');
                $state.go('home');
                vm.authenticationError = false;
            }).catch(function (error) {
                // $rootScope.alertValue = true;
                // $rootScope.loginValue =false;
                LoginService.logout();
                notify('info', '登录失败', '请检查用户名密码是否正确！');
                vm.authenticationError = true;
            })
        }


    }
})();