(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('TeaInfoCtrl', TeaInfoCtrl);

    TeaInfoCtrl.$inject = ['testService', '$scope', '$filter', 'toaster', 'TeacherService'];

    function TeaInfoCtrl(testService, $scope, $filter, toaster, TeacherService) {
        testService.test().then(function (userData) {
            var notify = function (type, title, message) {
                toaster.pop(type, title, message);
            };
            $scope.condition = {
                teaNo: '',
                teaName: '',
                teaSex: '',
                teaAge: '',
                teaPhone: '',
                teaTitle: '',
                college:''
            };

            $scope.sexSource = [
                {sex: '男'},
                {sex: '女'}
            ];

            $scope.collegeSource = [
                {college: ''},
                {college: '软件工程学院'},
                {college: '商学院'},
                {college: '能源与机械工程学院'}
            ];

            $scope.titleSource = [
                {title: ''},
                {title: '助教'},
                {title: '讲师'},
                {title: '副教授'},
                {title: '教授'}
            ];

            $scope._initPage = true;
            $scope.toolbar = [
                {
                    template: '<kendo-button ng-click="add($event)"><span class="k-icon k-i-add"></span>新增</kendo-button>'
                },
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
                id: "teaNo",
                fields: {
                    teaNo: {type: "string"},
                    teaName: {type: "string"},
                    teaSex: {type: "string"},
                    teaAge: {type: "string"},
                    teaPhone: {type: "string"},
                    teaTitle: {type: "string"},
                    college: {type: "string"}
                }
            });
            $scope.columns = [
                {
                    field: "teaNo", title: "教师编号"
                },
                {
                    field: "teaName", title: "教师姓名"
                },
                {
                    field: "teaSex", title: "教师性别"
                },
                {
                    field: "teaAge", title: "教师年龄"
                },
                {
                    field: "teaTitle", title: "教师职称"
                },
                {
                    field: "teaPhone", title: "联系电话"
                },
                {
                    field: "college", title: "学院"
                }
            ];

            $scope.dataSource = new kendo.data.DataSource({
                autoBind: false,
                transport: {
                    read: function (e) {
                        // console.log($scope.condition)
                        TeacherService.getTeacher($scope.condition).then(function (response) {
                            // console.log("user",response)
                            e.success(response.data);
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '查询失败' + error);
                        });
                    },
                    create: function (e) {
                        var phoneNumReg = /^1[3|4|5|7|8]\d{9}$/;
                        if(e.data.teaPhone && !phoneNumReg.test(e.data.teaPhone)) {
                            alert('手机号码有误，请重填，手机号码11位数字，前两位13、14、15、17、18手机号码');
                        } else if (e.data.teaNo.length == 0) {
                            alert('教师编号不能为空');
                        } else{
                            TeacherService.saveTeacher(e.data).then(function (response) {
                                console.log("update", response);
                                $scope.grid.dataSource.read();
                                e.success(response);
                                notify('success', '成功', '新增成功！');
                            }, function (error) {
                                e.error(error);
                                notify('error', '失败', '新增失败' + error);
                            });
                        }

                    },
                    update: function (e) {

                        var phoneNumReg = /^1[3|4|5|7|8]\d{9}$/;
                        if(e.data.teaPhone && !phoneNumReg.test(e.data.teaPhone)) {
                            alert('手机号码有误，请重填，手机号码11位数字，前两位13、14、15、17、18手机号码');
                        }else{
                            TeacherService.saveTeacher(e.data).then(function (response) {
                                console.log("update", response)
                                $scope.grid.dataSource.read();
                                e.success(response);
                                notify('success', '成功', '修改成功！');
                            }, function (error) {
                                e.error(error);
                                notify('error', '失败', '修改失败' + error);
                            });
                        }
                    },
                    destroy: function (e) {
                        console.log("delete", e.data);
                        TeacherService.deleteTeacher(e.data).then(function (response) {
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
            $scope.add = function (e) {
                if (userData.permission == 'admin') {
                    var selected = $scope.grid.select();
                    $scope.grid.addRow(selected);
                }else {
                    alert('对不起，您不是管理员');
                }
            };
            $scope.update = function (e) {
                if (userData.permission == 'admin') {
                    var selected = $scope.grid.select();
                    if (selected.length == 0) {
                        notify('waring', '提示', '请先选择一行！')
                    } else {
                        $scope.grid.editRow(selected);
                    }
                }else {
                    alert('对不起，您不是管理员');
                }
            };
            $scope.destroy = function (e) {
                if (userData.permission == 'admin') {
                    var selected = $scope.grid.select();
                    if (selected.length == 0) {
                        notify('waring', '提示', '请先选择一行！');
                    } else {
                        $scope.grid.removeRow(selected);
                    }
                }else {
                    alert('对不起，您不是管理员');
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