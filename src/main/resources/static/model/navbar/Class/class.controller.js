(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('ClassInfoCtrl', ClassInfoCtrl);

    ClassInfoCtrl.$inject = ['testService', '$scope', '$filter', 'toaster', 'ClassService', 'LoginService'];

    function ClassInfoCtrl(testService, $scope, $filter, toaster, ClassService) {
        testService.test().then(function (userData) {
            // vm.data = resp;

            var notify = function (type, title, message) {
                toaster.pop(type, title, message);
            };
            $scope.condition = {
                classNo: '',
                className: '',
                major: '',
                personCount: '',
                college: ''
            };

            $scope.collegeSource = [
                {college: ''},
                {college: '软件工程学院'},
                {college: '商学院'},
                {college: '能源与机械工程学院'}
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
                id: "classNo",
                fields: {
                    classNo: {type: "string"},
                    className: {type: "string"},
                    major: {type: "string"},
                    personCount: {type: "int"},
                    college: {type: "string"}
                }
            });
            $scope.columns = [

                {
                    field: "classNo", title: "班级编号"
                },
                {
                    field: "className", title: "班级名称"
                },
                {
                    field: "major", title: "专业"
                },
                {
                    field: "college", title: "学院"
                },
                {
                    field: "personCount", title: "人数"
                }
            ];

            $scope.dataSource = new kendo.data.DataSource({
                autoBind: false,
                transport: {
                    read: function (e) {
                        // console.log($scope.condition)
                        ClassService.getClass($scope.condition).then(function (response) {
                            // console.log("user",response)
                            e.success(response.data);
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '查询失败' + error);
                        });
                    },
                    create: function (e) {
                        ClassService.saveClass(e.data).then(function (response) {
                            e.success(response);
                            notify('success', '成功', '新增成功！');
                            $scope.grid.dataSource.read();
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '新增失败' + error);
                        });
                    },
                    update: function (e) {
                        ClassService.saveClass(e.data).then(function (response) {
                            console.log("update", response)
                            e.success(response);
                            notify('success', '成功', '修改成功！');
                            $scope.grid.dataSource.read();
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '修改失败' + error);
                        });

                    },
                    destroy: function (e) {
                        console.log("delete", e.data);
                        ClassService.deleteClass(e.data).then(function (response) {
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

            $scope.update = function (e) {
                var selected = $scope.grid.select();
                if (selected.length == 0) {
                    notify('waring', '提示', '请先选择一行！')
                } else {
                    $scope.grid.editRow(selected);
                }
            };
            $scope.destroy = function (e) {
                var selected = $scope.grid.select();
                if (selected.length == 0) {
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