(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('OnlineChooseCtrl', OnlineChooseCtrl);

    OnlineChooseCtrl.$inject = ['testService', '$scope', '$filter', 'toaster', 'CourseService', '$state'];

    function OnlineChooseCtrl(testService, $scope, $filter, toaster, CourseService, $state) {
        testService.test().then(function (userData) {

            CourseService.getStatus().then(function (response) {
                console.log('status'+response.data);
                if (response.data == false){
                    alert('网上选课已关闭');
                    $state.go('home');
                }
            }, function (error) {
            });

            var notify = function (type, title, message) {
                toaster.pop(type, title, message);
            };

            var date=new Date;
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var currentTerm = 1;
            if (3<= month <= 7) {
                currentTerm = 2;
            }
            var after = new Array();
            after[0] = year - 3;
            after[1] = year - 2;
            after[2] = year - 1;
            after[3] = year;
            after[4] = year + 1;
            after[5] = year + 2;
            after[6] = year + 3;
            var before = new Array();
            before[0] = year - 4;
            before[1] = year - 3;
            before[2] = year - 2;
            before[3] = year - 1;
            before[4] = year;
            before[5] = year + 1;
            before[6] = year + 2;
            var now = new Array();
            for(var i = 0; i < after.length; i ++) {
                now[i] = before[i] + "-" + after[i];
            }

            $scope.condition = {
                stuNo:userData.username,
                schoolYear:now[3],
                schoolTerm:currentTerm,
            };

            $scope.termSource = [
                {term: currentTerm}
            ];

            $scope.yearSource = [
                {year: now[3]}
            ];

            $scope.columns = [
                {
                    field: "courseNo", title: "课程编号"
                },
                {
                    field: "courseName", title: "课程名称"
                },
                {
                    field: "courseKind", title: "课程性质"
                },
                {
                    field: "count", title: "上课人数"
                },
                {
                    field: "teaName", title: "授课教师"
                },
                {
                    field: "courseCredit", title: "课程学分"
                },
                {
                    field: "courseWeek", title: "课时周数"
                },
                {
                    field: "courseTime", title: "上课时间"
                },
                {
                    field: "coursePlace", title: "上课地点"
                },
                {
                    field: "xx", title: "操作",
                    template: '<a class="k-button" ng-click="choose(dataItem)">选课</a>'
                },
                {
                    field: "xx", title: "操作",
                    template: '<a class="k-button" ng-click="nochoose(dataItem)">退选</a>'
                }
            ];


            $scope.Model = kendo.data.Model.define({
                id: "courseNo"
            });

            $scope._initPage = true;
            $scope.pageable = {
                refresh: true,
                pageSizes: true,
                numeric: false,
                input: true
            };

            $scope.dataSource = new kendo.data.DataSource({
                autoBind: false,
                transport: {
                    read: function (e) {
                        CourseService.findInDetailCanChoose($scope.condition).then(function (response) {
                            console.log("result",response.data);
                            e.success(response.data);
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '查询失败');
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

            $scope.choose = function (data) {
                var item = {
                    stuNo:userData.username,
                    courseNo:data.courseNo
                }
                console.log('item.courseNo'+item.courseNo);
                CourseService.getStuCourseCount(item.courseNo).then(function (response) {
                    console.log('data: '+ response.data);
                    if (response.data >= data.count) {
                        notify('warning', '提示', '该课程人数已满');
                    } else {

                        CourseService.saveStuCourse(item).then(function (response) {
                            console.log("result",response.data);

                            if (response.data == 1) {
                                notify('success', '成功', '选课成功');
                            } else {
                                notify('warning', '提示', '您已选过该课程');
                            }
                        }, function (error) {
                            notify('error', '失败', '选课失败');
                        });

                    }
                },function (error) {
                })

            };

            $scope.nochoose = function (data) {
                var item = {
                    stuNo:userData.username,
                    courseNo:data.courseNo
                }
                CourseService.deleteStuCourse(item).then(function (response) {
                    console.log("result",response.data);
                    if (response.data == 1) {
                        notify('success', '成功', '退选成功');
                    } else {
                        notify('warning', '提示', '您还未选过该课程');
                    }
                    e.success(response.data);
                }, function (error) {
                    notify('error', '失败', '选课失败');
                    e.error(error);
                });
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