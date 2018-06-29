(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('CourseChooseCtrl', CourseChooseCtrl);

    CourseChooseCtrl.$inject = ['testService', '$scope', '$filter', 'toaster', 'CourseService'];

    function CourseChooseCtrl(testService, $scope, $filter, toaster, CourseService) {
        testService.test().then(function (userData) {
            // vm.data = resp;

            var notify = function (type, title, message) {
                toaster.pop(type, title, message);
            };

            var date=new Date;
            var year=date.getFullYear();
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
                schoolTerm:'1',
            };

            $scope.termSource = [
                {term: '1'},
                {term: '2'}
            ];

            $scope.yearSource = [
                {year: now[0]},
                {year: now[1]},
                {year: now[2]},
                {year: now[3]},
                {year: now[4]},
                {year: now[5]},
                {year: now[6]}
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
                        CourseService.getStuCourse($scope.condition).then(function (response) {
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