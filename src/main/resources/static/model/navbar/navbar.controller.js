(function () {
    'use strict';

    angular
        .module('app')
        .controller('navbarCtrl', navbarCtrl);

    navbarCtrl.$inject = ['$state', 'LoginService', '$rootScope', '$filter', 'toaster', 'UserService'];

    function navbarCtrl($state, LoginService, $rootScope, $filter, toaster, UserService) {
        var notify = function (type, title, message) {
            toaster.pop(type, title, message);
        };
        var vm = this;
        vm.userLogout = userLogout;
        vm.openModal1 = openModal1;
        vm.openModal2 = openModal2;

        vm.changePwd = changePwd;

        vm.hideNav = hideNav;
        $rootScope.loginValue = true;
        $rootScope.adminValue = false;
        $rootScope.teacherValue = false;
        $rootScope.studentValue = false;
        var userdata=JSON.parse(sessionStorage.getItem("userdata"));//对象
        if(userdata){
            $rootScope.LUser = userdata;
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

        function hideNav() {
            angular.element("#myCollapsible").collapse('hide')
        }

        //打开模态框
        function openModal0() {
            angular.element('#myModelzero').modal('show');

        }
        function openModal1() {
            angular.element('#myModelone').modal('show');
        }

        function openModal2() {
            angular.element('#myModelTwo').modal('show');
        }

        
        //  退出登录
        function userLogout() {
            LoginService.logout();
            sessionStorage.removeItem("userdata");
            $rootScope.loginValue = true;
            $rootScope.adminValue = false;
            $rootScope.studentValue = false;
            $rootScope.teacherValue = false;
            $state.go("home")
        };

        // 修改密码
        function changePwd(data1, data2) {
            console.log(data1, data2);
            if (data1) {
                if (data1.newpwd === data1.oldpwd) {
                    var time = $filter('date')(new Date(), 'yyyyMMddHHmmss');
                    vm.condition = {
                        username: data2.username,
                        password: data1.newpwd,
                        permission: data2.permission,
                    }
                    console.log(vm.condition);
                    UserService.updatePassword(vm.condition).then(function (response) {
                        console.log(response);
                        // $rootScope.loginValue = false;
                        // $rootScope.loginValue1 = false;
                        // $rootScope.adminValue = false;
                        angular.element('#myModelTwo').modal('hide');
                        notify('success', '成功', '修改密码成功！');
                        userLogout();
                        $state.go('home')
                    }, function (error) {
                        notify('error', '失败', '修改密码失败' + error);
                    });
                } else {
                    notify('error', '失败', '请检查两次密码是否一致！');
                }
            } else {
                notify('error', '失败', '请输入新密码！');
            }


        }




    };
})();