(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('StuCourseCtrl', StuCourseCtrl);

    StuCourseCtrl.$inject = ['testService', '$scope', '$filter', 'toaster', 'StudentService'];

    function StuCourseCtrl(testService, $scope, $filter, toaster, StudentService) {
        testService.test().then(function (userData) {
            // vm.data = resp;

            var notify = function (type, title, message) {
                toaster.pop(type, title, message);
            };
            $scope.condition = {
                stuNo: '',//学号
                // $scope.condition.stu_no
                classNo: '',//班级编号
                stuPhoto: '',//学生照片
                stuName: '',//姓名
                // $scope.condition.stu_name
                stuSex: '',//性别
                stuBirthTime: '',//出生日期
                stuProvince: '',//籍贯
                stuNation: '',//民族
                stuFace: '',//政治面貌
                stuStudyTime: '',//学制
                stuSchoolTime: '',//入学时间
                stuDormitory: '',//宿舍
                stuPhone: '',//联系电话
                stuEMail: '',//邮件地址
                stuPost: '',//邮编
                stuID: '',//身份证号
                stuIsGraduate: '',//是否毕业
                stuGraduateDate: '',//毕业日期
                stuFatherName: '',//父亲姓名
                stuFatherJob: '',//父亲职业
                stuFatherPhone: '',//父亲联系方式
                stuMotherName: '',//母亲姓名
                stuMotherJob: '',//母亲职业
                stuMotherPhone: '',//母亲联系方式
                beginTime: '',
                endTime: ''
            };

            $scope._initPage = true;
            $scope.pageable = {
                refresh: true,
                pageSizes: true,
                numeric: false,
                input: true
            };
            //, validation: {required: true} nullable: true,, editable: false
            $scope.Model = kendo.data.Model.define({
                id: "stuNo"
            });
            $scope.columns = [
                {
                    field: "schoolYear", title: "学年",
                },
                {
                    field: "schoolTerm", title: "学期"
                },
                {
                    field: "stuNo", title: "学号",
                },
                {
                    field: "stuName", title: "学生姓名"
                },
                {
                    field: "classNo", title: "班级编号"
                },
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
                    field: "courseCredit", title: "课程学分"
                },
                {
                    field: "courseWeek", title: "课时周数"
                },
                {
                    field: "teaName", title: "授课教师"
                },
                {
                    field: "courseTime", title: "上课时间"
                },
                {
                    field: "coursePlace", title: "上课地点"
                }
            ];

            $scope.dataSource = new kendo.data.DataSource({
                autoBind: false,
                transport: {
                    read: function (e) {
                        StudentService.getCourseTableInfo($scope.condition).then(function (response) {
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