(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['testService', '$scope', '$filter', 'toaster', 'UserService', 'LoginService'];

    function UserCtrl(testService, $scope, $filter, toaster, UserService, LoginService) {
        testService.test().then(function (userData) {
            // vm.data = resp;

            var notify = function (type, title, message) {
                toaster.pop(type, title, message);
            };
            $scope.condition = {
                permission: 'admin',
                username: '',
                password: ''

            };

            $scope.permissionSource = [
                {permission: 'admin'},
                {permission: 'student'},
                {permission: 'teacher'}
            ];

            $scope._initPage = true;
            $scope.toolbar = [
                "create",
                {
                    template: '<kendo-button ng-click="update($event)"><span class="k-icon k-i-edit"></span>修改</kendo-button>'
                },
                {
                    template: '<kendo-button ng-click="destroy($event)"><span class="k-icon k-i-delete"></span>删除</kendo-button>'
                }

            ];
            $scope.pageable = {
                refresh: true,
                pageSizes: true,
                numeric: false,
                input: true
            };
            //, validation: {required: true} nullable: true,, editable: false
            $scope.Model = kendo.data.Model.define({
                id: "username",
                fields: {
                    permission: {type: "string"},
                    username: {type: "string"},
                    password: {type: "string"},
                }
            });
            $scope.columns = [

                {
                    field: "username", title: "姓名"
                },
                {
                    field: "permission", title: "权限"
                },
                {
                    field: "password", title: "密码",hidden: true
                }
            ];

            $scope.dataSource = new kendo.data.DataSource({
                autoBind: false,
                transport: {
                    read: function (e) {
                        // console.log($scope.condition)
                        UserService.getUser($scope.condition).then(function (response) {
                            // console.log("user",response)
                            e.success(response.data);
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '查询失败' + error);
                        });
                    },
                    create: function (e) {
                        if (e.data.username.length == 0) {
                            alert('用户名不能为空');
                        } else {
                            UserService.addUser(e.data).then(function (response) {
                                e.success(response);
                                notify('success', '成功', '新增成功！');
                                $scope.grid.dataSource.read();
                            }, function (error) {
                                e.error(error);
                                notify('error', '失败', '新增失败' + error);
                            });
                        }
                    },
                    update: function (e) {
                        if (e.data.username.length == 0) {
                            alert('用户名不能为空');
                        } else {
                            UserService.updateUser(e.data).then(function (response) {
                                e.success(response);
                                notify('success', '成功', '修改成功！');
                                $scope.grid.dataSource.read();
                            }, function (error) {
                                e.error(error);
                                notify('error', '失败', '修改失败' + error);
                            });
                        }
                    },
                    destroy: function (e) {
                        UserService.deleteUser(e.data).then(function (response) {
                            console.log("e.data", e.data);
                            console.log(response);
                            e.success(response);
                            notify('success', '成功', '删除成功！');
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '删除失败' + error);
                        });
                    },

                    parameterMap: function (options, operation) {
                        if (operation !== "read" && options.models) {
                            return {models: kendo.stringify(options.models)};
                        }
                    }
                },
                requestStart: function (e) {
                    if ($scope._initPage) {
                        e.preventDefault();
                    }
                },
                // batch: true,
                pageSize: 15,
                schema: {
                    model: $scope.Model
                }
            });

            $scope.query = function () {
                $scope._initPage = false;
                $scope.grid.dataSource.read();
            };
            // console.log($scope.dataSource)
            $scope.upValue = true;
            $scope.updateValue = "";
            $scope.update = function (e) {
                // $scope.upValue = false;
                $scope.updateValue = "update";
                var selected = $scope.grid.select();
                if (selected.length == 0) {
                    notify('waring', '提示', '请先选择一行！');
                    $scope.updateValue = "";
                } else {
                    $scope.grid.editRow(selected);
                    // $scope.upValue = true;
                    $scope.updateValue = "";
                }
            };
            $scope.destroy = function (e) {
                var selected = $scope.grid.select();
                console.log("selected", selected);
                if (selected.length == 0) {
                    //alert('No record selected')
                    notify('waring', '提示', '请先选择一行！');
                } else {
                    $scope.grid.removeRow(selected);
                }
            };
            $scope.editable = {
                mode: "popup",
                template: kendo.template($("#gridEditor").html()),

            };
            $scope.gridRowEdit = function (e) {
                var time = $filter('date')(new Date(), 'yyyyMMddHHmmss');
                if ($scope.updateValue == "update") {
                    $scope.upValue = false;
                    e.model.set('rec_rivise_time', time);
                    e.model.set('rec_rivisor', userData.user_name);
                } else {
                    $scope.upValue = true;
                    e.model.set('rec_rivise_time', time);
                    e.model.set('rec_rivisor', userData.user_name);
                    e.model.set('rec_create_time', time);
                    e.model.set('rec_creator', userData.user_name);
                }
                $scope.currentModel = e.model;
            };

        }, function (error) {
        });
    };
})();