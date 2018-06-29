(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('TeaLessonCtrl', TeaLessonCtrl);

    TeaLessonCtrl.$inject = ['testService', '$scope', '$filter', 'toaster', 'TeacherService'];

    function TeaLessonCtrl(testService, $scope, $filter, toaster, TeacherService) {
        testService.test().then(function (userData) {
            var notify = function (type, title, message) {
                toaster.pop(type, title, message);
            };
            $scope.condition = {
                id: '',
                teaNo: '',
                teaName: '',
                courseNo: '',
                courseName: ''
            };

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
                id: "id",
                fields: {
                    id: {type: "number"},
                    teaNo: {type: "string"},
                    teaName: {type: "string"},
                    courseNo: {type: "string"},
                    courseName: {type: "string"}
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
                    field: "courseNo", title: "课程编号"
                },
                {
                    field: "courseName", title: "课程名称"
                }
            ];

            $scope.dataSource = new kendo.data.DataSource({
                autoBind: false,
                transport: {
                    read: function (e) {
                        // console.log($scope.condition)
                        TeacherService.getTeaCourse($scope.condition).then(function (response) {
                            // console.log("user",response)
                            e.success(response.data);
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '查询失败' + error);
                        });
                    },
                    create: function (e) {
                        TeacherService.saveTeaCourse(e.data).then(function (response) {
                            console.log("update", response)
                            e.success(response);
                            if (response.data == 1) {
                                notify('success', '成功', '新增成功！');
                            } else if (response.data == -1) {
                                notify('error', '失败', '该记录已存在');
                            } else {
                                notify('error', '失败', '教师或课程不存在');
                            }
                            $scope.grid.dataSource.read();
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '新增失败' + error);
                        });
                    },
                    update: function (e) {
                        TeacherService.saveTeaCourse(e.data).then(function (response) {
                            console.log("update", response)
                            e.success(response);
                            if (response.data == 1) {
                                notify('success', '成功', '修改成功！');
                            } else {
                                notify('error', '失败', '教师或课程不存在');
                            }
                            $scope.grid.dataSource.read();
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '修改失败' + error);
                        });
                    },
                    destroy: function (e) {
                        console.log("delete", e.data);
                        TeacherService.deleteTeaCourse(e.data).then(function (response) {
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
                } else {
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
                } else {
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

                if (e.model.isNew()) {
                    $scope.isReadOnly=false;
                }
                else {
                    $scope.isReadOnly=true;
                }

                $scope.currentModel = e.model;
            };

        }, function (error) {
        });
    };
})();