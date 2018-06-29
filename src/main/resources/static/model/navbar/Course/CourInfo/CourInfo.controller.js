(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('CourInfoCtrl', CourInfoCtrl);

    CourInfoCtrl.$inject = ['testService','$scope', '$filter', 'toaster', 'CourseService', 'LoginService'];

    function CourInfoCtrl(testService, $scope, $filter, toaster, CourseService) {
        testService.test().then(function (userData) {

            var notify = function (type, title, message) {
                toaster.pop(type, title, message);
            };

            $scope.state = '已开启';
            CourseService.getStatus().then(function (response) {
                console.log('status'+response.data);
                if (response.data == false){
                    $scope.state = '已关闭';
                }
            }, function (error) {
            });

            $scope.condition = {
                schoolYear:'',
                schoolTerm:'',
                courseNo: '',//课程编号
                courseName: '',//课程名
                courseCredit: '',//课程学分
                courseKind: '',//课程性质
                courseWeek: '',//课时周数
                count: ''//上课人数
            };

            $scope.courseKindSource = [
                {kind: ''},
                {kind: '公共选修'},
                {kind: '公共必修'},
                {kind: '专业选修'},
                {kind: '专业必修'},
                {kind: '实习实践'}
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
                id: "courseNo",
                fields: {
                    schoolYear:{type: "string"},
                    schoolTerm:{type: "string"},
                    courseNo: {type: "string"},
                    courseName: {type: "string"},
                    courseCredit: {type: "string"},
                    courseKind: {type: "string"},
                    courseWeek: {type: "string"},
                    count: {type: "int"}
                }
            });
            $scope.columns = [
                {
                    field: "schoolYear", title: "学年"
                },
                {
                    field: "schoolTerm", title: "学期"
                },
                {
                    field: "courseNo", title: "课程编号"
                },
                {
                    field: "courseName", title: "课程名称"
                },
                {
                    field: "courseCredit", title: "课程学分"
                },
                {
                    field: "courseKind", title: "课程性质"
                },
                {
                    field: "courseWeek", title: "课时周数"
                },
                {
                    field: "count", title: "上课人数"
                }
            ];

            $scope.dataSource = new kendo.data.DataSource({
                autoBind: false,
                transport: {
                    read: function (e) {
                        console.log('condition: ' + $scope.condition);
                        CourseService.getCourse($scope.condition).then(function (response) {
                            // console.log("user",response)
                            e.success(response.data);
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '查询失败' + error);
                        });
                    },
                    create: function (e) {
                        if (e.data.courseNo.length == 0) {
                            alert('课程编号不能为空');
                        } else {
                            CourseService.saveCourse(e.data).then(function (response) {
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
                        if (e.data.courseNo.length == 0) {
                            alert('课程编号不能为空');
                        } else {
                            CourseService.saveCourse(e.data).then(function (response) {
                                console.log("update", response)
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
                        CourseService.deleteCourse(e.data).then(function (response) {
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

            $scope.open = function () {
                CourseService.saveStatus('true').then(function (response) {
                    $scope.state = '已开启';
                    notify('success', '成功', '已开启网上选课功能！');
                    e.success(response);
                }, function (error) {
                    notify('error', '失败', '开启失败' + error);
                    e.error(error);
                });
            };

            $scope.close = function () {
                CourseService.saveStatus('false').then(function (response) {
                    $scope.state = '已关闭';
                    notify('success', '成功', '已关闭网上选课功能！');
                    e.success(response);
                }, function (error) {
                    notify('error', '失败', '关闭失败' + error);
                    e.error(error);
                });
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