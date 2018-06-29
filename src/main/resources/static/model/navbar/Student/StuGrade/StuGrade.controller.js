(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('StuGradeCtrl', StuGradeCtrl);

    StuGradeCtrl.$inject = ['testService', '$scope', '$filter', 'toaster', 'StudentService'];

    function StuGradeCtrl(testService, $scope, $filter, toaster, StudentService) {
        testService.test().then(function (userData) {
            // vm.data = resp;

            var notify = function (type, title, message) {
                toaster.pop(type, title, message);
            };
            $scope.condition = {
                id:'',
                stuNo: '',//学号
                stuName: '',//姓名
                courseNo: '',
                courseName: '',
                courseScore: '',
                reStudyScore: '',
                reTestScore: ''
            };

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
                    id: {type: "number"},
                    courseNo: {type: "string"},
                    courseName: {type: "string"},
                    stuNo: {type: "string"},
                    stuName: {type: "string"},
                    courseScore: {type: "string"},
                    reStudyScore:{type: "string"},
                    reTestScore: {type: "string"}
                }
            });
            $scope.columns = [
                {
                    field: "id", title: "序号", hidden: true
                },
                {
                    field: "stuNo", title: "学号", validation: {required: true}
                },
                {
                    field: "stuName", title: "姓名", validation: {required: true}
                },
                {
                    field: "courseNo", title: "课程编号", validation: {required: true}
                },
                {
                    field: "courseName", title: "课程名称", validation: {required: true}
                },
                {
                    field: "courseScore", title: "课程分数", validation: {required: true}
                },
                {
                    field: "reTestScore", title: "补考成绩"
                },
                {
                    field: "reStudyScore", title: "重修成绩"
                }
            ];

            $scope.dataSource = new kendo.data.DataSource({
                autoBind: false,
                transport: {
                    read: function (e) {
                        StudentService.getScore($scope.condition).then(function (response) {
                            // console.log("user",response)
                            e.success(response.data);
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '查询失败');
                        });
                    },

                    create: function (e) {
                        console.log("e.data",e.data);
                        var reg = /^(\-|\+?)\d+(\.\d+)?$/;
                        if(e.data.courseScore.length != 0 && !reg.test(e.data.courseScore)) {
                            alert('课程分数必须为数字类型');
                        } else if (e.data.reTestScore.length != 0 && !reg.test(e.data.reTestScore)) {
                            alert('补考成绩必须为数字类型');
                        } else if (e.data.reStudyScore.length != 0 && !reg.test(e.data.reStudyScore)) {
                            alert('重修成绩必须为数字类型');
                        } else{
                            StudentService.saveScore(e.data).then(function (response) {
                                e.success(response);
                                if (response.data == 1) {
                                    notify('success', '成功', '新增成功');
                                } else {
                                    notify('error', '失败', '学生或课程不存在');
                                }
                                $scope.grid.dataSource.read();
                            }, function (error) {
                                e.error(error);
                                notify('error', '失败', '新增失败');
                            });
                        }

                    },

                    update: function (e) {
                        console.log("e.data",e.data);
                        var reg = /^(\-|\+?)\d+(\.\d+)?$/;
                        if(e.data.courseScore.length != 0 && !reg.test(e.data.courseScore)) {
                            alert('课程分数必须为数字类型');
                        } else if (e.data.reTestScore.length != 0 && !reg.test(e.data.reTestScore)) {
                            alert('补考成绩必须为数字类型');
                        } else if (e.data.reStudyScore.length != 0 && !reg.test(e.data.reStudyScore)) {
                            alert('重修成绩必须为数字类型');
                        } else{
                            StudentService.saveScore(e.data).then(function (response) {
                                e.success(response);
                                notify('success', '成功', '修改成功');
                                $scope.grid.dataSource.read();
                            }, function (error) {
                                e.error(error);
                                notify('error', '失败', '修改失败');
                            });
                        }
                    },

                    destroy: function (e) {
                        console.log('del',e.data);
                        StudentService.deleteScore(e.data).then(function (response) {
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
                    var d=document.getElementsByClassName('ch');
                    for(var i=0;i<d.length;i++){
                        d[i].setAttribute('disabled','true')
                        d[i].setAttribute('style','background:#F5FAFE')
                    }
                }
            };

            $scope.destroy = function (e) {
                if (userData.permission == 'admin') {
                    var selected = $scope.grid.select();
                    console.log("selected", selected);
                    if (selected.length == 0) {
                        notify('warning', '提示', '请先选择一行！');
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
                    var d=document.getElementsByClassName('ch');
                    for(var i=0;i<d.length;i++){
                        d[i].removeAttribute('disabled');
                        d[i].removeAttribute('style')
                    }
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