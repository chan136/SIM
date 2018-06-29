(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('StuScheduleCtrl', StuScheduleCtrl);

    StuScheduleCtrl.$inject = ['testService', '$scope', '$filter', 'toaster', 'StudentService'];

    function StuScheduleCtrl(testService, $scope, $filter, toaster, StudentService) {
        testService.test().then(function (userData) {
            // vm.data = resp;

            var notify = function (type, title, message) {
                toaster.pop(type, title, message);
            };
            $scope.condition = {
                id:'',
                college: '',
                major: '',
                classNo: '',
                schoolYear: '',
                schoolTerm: '',
                courseNo: '',
                courseTime: '',
                coursePlace: ''
            };

            $scope.collegeSource = [
                {college: ''},
                {college: '软件工程学院'},
                {college: '商学院'},
                {college: '能源与机械工程学院'}
            ];

            $scope.termSource = [
                {term: ''},
                {term: '1'},
                {term: '2'}
            ];

            $scope.yearSource = [
                {year: ''},
                {year: '2009-2010'},
                {year: '2010-2011'},
                {year: '2011-2012'},
                {year: '2012-2013'},
                {year: '2013-2014'},
                {year: '2014-2015'},
                {year: '2015-2016'},
                {year: '2016-2017'},
                {year: '2017-2018'},
                {year: '2018-2019'}
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
                id: "id",
                fields: {
                    id: {type: "number", editable: false, nullable: true},
                    college: {type: "string"},
                    major: {type: "string"},
                    classNo: {type: "string"},
                    schoolYear: {type: "string"},
                    schoolTerm: {type: "string"},
                    courseNo:{type: "string"},
                    courseTime: {type: "string"},
                    coursePlace: {type: "string"}
                }
            });
            $scope.columns = [
                {
                    field: "id", title: "序号", hidden: true
                },
                {
                    field: "schoolYear", title: "学年"
                },
                {
                    field: "schoolTerm", title: "学期"
                },
                {
                    field: "college", title: "学院"
                },
                {
                    field: "major", title: "专业"
                },
                {
                    field: "classNo", title: "班级编号"
                },
                {
                    field: "className", title: "班级名称"
                },
                {
                    field: "courseNo", title: "课程编号"
                },
                {
                    field: "courseName", title: "课程名称"
                },
                {
                    field: "courseTime", title: "上课时间"
                },
                {
                    field: "coursePlace", title: "上课地点"
                },
            ];

            $scope.dataSource = new kendo.data.DataSource({
                autoBind: false,
                transport: {
                    read: function (e) {
                        StudentService.getCourseTable($scope.condition).then(function (response) {
                            // console.log("user",response)
                            e.success(response.data);
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '查询失败');
                        });
                    },

                    create: function (e) {
                        StudentService.saveCourseTable(e.data).then(function (response) {
                            e.success(response);
                            if (response.data == 1) {
                                notify('success', '成功', '新增成功');
                            } else {
                                notify('error', '失败', '班级或课程不存在');
                            }
                            $scope.grid.dataSource.read();
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '新增失败');
                        });
                    },

                    update: function (e) {
                        StudentService.saveCourseTable(e.data).then(function (response) {
                            e.success(response);
                            if (response.data == 1) {
                                notify('success', '成功', '修改成功');
                            } else {
                                notify('error', '失败', '班级或课程不存在');
                            }
                            $scope.grid.dataSource.read();
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '修改失败');
                        });
                    },

                    destroy: function (e) {
                        console.log('del',e.data);
                        StudentService.deleteCourseTable(e.data).then(function (response) {
                            console.log("e.data", e.data);
                            console.log(response);
                            e.success(response);
                            notify('success', '成功', '删除成功');
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '删除失败');
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
                    notify('warning', '提示', '请先选择一行！');
                } else {
                    $scope.grid.editRow(selected);
                }
            };

            $scope.destroy = function (e) {
                var selected = $scope.grid.select();
                console.log("selected", selected);
                if (selected.length == 0) {
                    notify('warning', '提示', '请先选择一行！');
                } else {
                    $scope.grid.removeRow(selected);
                }
            };

            $scope.editable = {
                mode: "popup",
                template: kendo.template($("#gridEditor").html()),

            };

            $scope.gridRowEdit=function (e) {

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