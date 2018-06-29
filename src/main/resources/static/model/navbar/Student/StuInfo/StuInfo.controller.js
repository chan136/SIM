(function () {
    'use strict';
    angular
        .module('app.home')
        .controller('StuInfoCtrl', StuInfoCtrl)
        .controller('StuInfoMoreCtrl', StuInfoMoreCtrl)
        .controller('StuInfoAddCtrl', StuInfoAddCtrl)

    StuInfoCtrl.$inject = ['testService', '$scope', 'toaster', 'StudentService', '$state'];
    StuInfoMoreCtrl.$inject = ['testService','$scope', "$stateParams", 'StudentService', '$state'];
    StuInfoAddCtrl.$inject = ['testService','$scope', 'StudentService', '$state'];

    function StuInfoCtrl(testService, $scope, toaster, StudentService, $state) {

        $scope.beginTime = '';
        $scope.endTime = '';
        Date.prototype.format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1,                 //月份
                "d+": this.getDate(),                    //日
                "h+": this.getHours(),                   //小时
                "m+": this.getMinutes(),                 //分
                "s+": this.getSeconds(),                 //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        testService.test().then(function (userData) {
            // vm.data = resp;

            var notify = function (type, title, message) {
                toaster.pop(type, title, message);
            };

            $scope.data1 = {
                stu_no: '',
                stu_name: ''
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

            $scope.Model = kendo.data.Model.define({
                id: "stuNo",
            });

            $scope._initPage = true;
            $scope.toolbar = [
                {
                    template: '<kendo-button ng-click="add($event)"><span class="k-icon k-i-add"></span>新增</kendo-button>'
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

            $scope.columns = [
                {
                    field: "stuNo", title: "学号"
                },
                {
                    field: "stuName", title: "姓名"
                },
                {
                    field: "stuSex", title: "性别"
                },
                {
                    field: "stuBirthTime", title: "出生日期"
                },
                {
                    field: "college", title: "学院"
                },
                {
                    field: "major", title: "专业"
                },
                {
                    field: "className", title: "班级名称"
                },
                {
                    field: "teaName", title: "班主任"
                },
                {
                    field: "stuPhone", title: "联系方式"
                },
                {
                    field: "stuSchoolTime", title: "入学时间"
                },
                {
                    field: "xx", title: "更多",
                    template: '<a class="k-button" ng-click="stuInfo(dataItem)">修改</a>'
                }
            ];

            $scope.stuInfo = function (data) {
                if (userData.permission == 'admin') {
                    $state.go("StuInfoMore", {item: data});
                } else {
                    alert('对不起，您不是管理员');
                }
            };
            $scope.dataSource = new kendo.data.DataSource({
                autoBind: false,
                transport: {
                    read: function (e) {
                        console.log('read', $scope.condition)
                        StudentService.getStuInfo($scope.condition).then(function (response) {
                            // console.log("user",response)
                            e.success(response.data);
                        }, function (error) {
                            e.error(error);
                            notify('error', '失败', '查询失败' + error);
                        });
                    },
                    destroy: function (e) {
                        console.log('del', e.data);
                        StudentService.deleteInfo(e.data).then(function (response) {
                            console.log("e.data", e.data);
                            console.log(response);
                            e.success(response);
                            notify('success', '成功', '删除成功');
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
                $scope.condition.stuName = $scope.data1.stu_name;
                $scope.condition.stuNo = $scope.data1.stu_no;
                $scope.condition.beginTime = '';
                $scope.condition.endTime = '';
                if ($scope.beginTime != '' && $scope.beginTime != null) {
                    $scope.condition.beginTime = $scope.beginTime.format("yyyyMMdd");
                }
                if ($scope.endTime != '' && $scope.endTime != null) {
                    $scope.condition.endTime = $scope.endTime.format("yyyyMMdd");
                }
                console.log("$scope.condition", $scope.condition);

                $scope.grid.dataSource.read();
            };

            $scope.add = function (e) {
                if (userData.permission == 'admin') {
                    $state.go("StuInfoAdd");
                } else {
                    alert('对不起，您不是管理员');
                }
            };

            $scope.destroy = function (e) {
                var selected = $scope.grid.select();
                console.log("selected", selected);
                if (userData.permission == 'admin') {
                    if (selected.length == 0) {
                        //alert('No record selected')
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

        }, function (error) {
        });
    }

    function StuInfoMoreCtrl(testService,$scope, $stateParams, StudentService, $state) {

        testService.test().then(function (userData) {

            var file;

            $('input[type=file]').change(function(){
                file=this.files[0];
                console.log('file'+file);
                console.log('name'+file.name);
                console.log('stuNo'+$scope.info.stuNo);
                var reader = new FileReader();
                //使用该对象读取file文件
                reader.readAsDataURL(file);
                //读取文件成功后执行的方法函数
                reader.onload=function(e) {
                    $('#show').get(0).src = e.target.result;
                }
            });
            
            $scope.sexDropDown = [
                {sex: '男'},
                {sex: '女'}
            ];

            $scope.faceDropDown = [
                {face: '共青团员'},
                {face: '党员'},
                {face: '清白'}
            ];

            $scope.collegeSource = [
                {college: '软件工程学院'},
                {college: '商学院'},
                {college: '能源与机械工程学院'}
            ];

            $scope.yearSource = [
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

            $scope.studyTimeSource = [
                {time: '1'},
                {time: '2'},
                {time: '3'},
                {time: '4'}
            ];

            $scope.isGraduateDropDown = [
                {isGraduate: '是'},
                {isGraduate: '否'}
            ];

            $scope.download= function () {
                //图片上传
                if ($scope.info.stuNo == "") {
                    alert('学号不能为空');
                } else if (file == null){
                    alert('上传图片为空');
                } else {
                    StudentService.getFileName($scope.info.stuNo).then(function (resp) {
                        StudentService.upload(file).then(function (resp) {
                            alert('图片保存成功');
                        }).catch(function (err) {
                            alert('图片保存失败');
                        })
                    }).catch(function (err) {
                    })
                }
            }

            $scope.info = $stateParams.item;
            $scope.save = function () {
                var info = {
                    stuNo: $scope.info.stuNo,//学号
                    classNo: $scope.info.classNo,//学号
                    stuPhoto: $scope.info.stuPhoto,//学号
                    stuName: $scope.info.stuName,//学号
                    stuSex: $scope.info.stuSex,//学号
                    stuBirthTime: $scope.info.stuBirthTime,//学号
                    stuProvince: $scope.info.stuProvince,//学号
                    stuNation: $scope.info.stuNation,//学号
                    stuFace: $scope.info.stuFace,//学号
                    stuStudyTime: $scope.info.stuStudyTime,//学号
                    stuSchoolTime: $scope.info.stuSchoolTime,//学号
                    stuDormitory: $scope.info.stuDormitory,//学号
                    stuPhone: $scope.info.stuPhone,//学号
                    stuEMail: $scope.info.stuEMail,//学号
                    stuPost: $scope.info.stuPost,//学号
                    stuID: $scope.info.stuID,//学号
                    stuIsGraduate: $scope.info.stuIsGraduate,//学号
                    stuGraduateDate: $scope.info.stuGraduateDate,//学号
                    stuFatherName: $scope.info.stuFatherName,//学号
                    stuFatherJob: $scope.info.stuFatherJob,//学号
                    stuFatherPhone: $scope.info.stuFatherPhone,//学号
                    stuMotherName: $scope.info.stuMotherName,//学号
                    stuMotherJob: $scope.info.stuMotherJob,//学号
                    stuMotherPhone: $scope.info.stuMotherPhone,//学号
                    beginTime: '',
                    endTime: ''
                };

                console.log(info);

                StudentService.SaveStu(info).then(function (resp) {
                    if (resp.data == 0) {
                        alert('学号或班级编号不能为空');
                    } else if (resp.data == -1) {
                        alert('班级不存在');
                    } else {
                        alert("保存成功");
                        $state.go('StuInfo');
                    }
                }).catch(function (err) {
                    alert("保存失败");
                })
            }
        }, function (error) {
        });

    }

    function StuInfoAddCtrl(testService,$scope, StudentService, $state) {

        testService.test().then(function (userData) {

            Date.prototype.format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1,                 //月份
                    "d+": this.getDate(),                    //日
                    "h+": this.getHours(),                   //小时
                    "m+": this.getMinutes(),                 //分
                    "s+": this.getSeconds(),                 //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds()             //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            };

            var file;
            $('input[type=file]').change(function(){
                file=this.files[0];
                console.log('file'+file);
                console.log('name'+file.name);
                console.log('stuNo'+$scope.info.stuNo);
                var reader = new FileReader();
                //使用该对象读取file文件
                reader.readAsDataURL(file);
                //读取文件成功后执行的方法函数
                reader.onload=function(e) {
                    $('#show').get(0).src = e.target.result;
                }
            });

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

            $scope.info = {
                stuNo: '',//学号
                classNo: '',//学号
                stuPhoto: '',//学号
                stuName: '',//学号
                stuSex: '男',//学号
                stuBirthTime: '',//学号
                stuProvince: '',//学号
                stuNation: '',//学号
                stuFace: '共青团员',//学号
                stuStudyTime: '4',//学号
                stuSchoolTime: '',//学号
                stuDormitory: '',//学号
                stuPhone: '',//学号
                stuEMail: '',//学号
                stuPost: '',//学号
                stuID: '',//学号
                stuIsGraduate: '否',//学号
                stuGraduateDate: '',//学号
                stuFatherName: '',//学号
                stuFatherJob: '',//学号
                stuFatherPhone: '',//学号
                stuMotherName: '',//学号
                stuMotherJob: '',//学号
                stuMotherPhone: '',//学号
                beginTime: '',
                endTime: ''
            };

            $scope.sexDropDown = [
                {sex: '男'},
                {sex: '女'}
            ];
            $scope.faceDropDown = [
                {face: '共青团员'},
                {face: '党员'},
                {face: '清白'},
            ];
            $scope.isGraduateDropDown = [
                {isGraduate: '是'},
                {isGraduate: '否'}
            ];

            $scope.termSource = [
                {term: '1'},
                {term: '2'}
            ];

            $scope.studyTimeSource = [
                {time: '1'},
                {time: '2'},
                {time: '3'},
                {time: '4'}
            ];

            $scope.download= function () {
                //图片上传
                if ($scope.info.stuNo == "") {
                    alert('学号不能为空');
                } else if (file == null){
                    alert('上传图片为空');
                } else {
                    StudentService.getFileName($scope.info.stuNo).then(function (resp) {
                        StudentService.upload(file).then(function (resp) {
                            alert('图片保存成功');
                        }).catch(function (err) {
                            alert('图片保存失败');
                        })
                    }).catch(function (err) {
                    })
                }
            }

            $scope.save = function () {
                var info = {
                    stuNo: $scope.info.stuNo,//学号
                    classNo: $scope.info.classNo,//学号
                    stuPhoto: $scope.info.stuPhoto,//学号
                    stuName: $scope.info.stuName,//学号
                    stuSex: $scope.info.stuSex,//学号
                    stuBirthTime: $scope.info.stuBirthTime,//学号
                    stuProvince: $scope.info.stuProvince,//学号
                    stuNation: $scope.info.stuNation,//学号
                    stuFace: $scope.info.stuFace,//学号
                    stuStudyTime: $scope.info.stuStudyTime,//学号
                    stuSchoolTime: $scope.info.stuSchoolTime,//学号
                    stuDormitory: $scope.info.stuDormitory,//学号
                    stuPhone: $scope.info.stuPhone,//学号
                    stuEMail: $scope.info.stuEMail,//学号
                    stuPost: $scope.info.stuPost,//学号
                    stuID: $scope.info.stuID,//学号
                    stuIsGraduate: $scope.info.stuIsGraduate,//学号
                    stuGraduateDate: $scope.info.stuGraduateDate,//学号
                    stuFatherName: $scope.info.stuFatherName,//学号
                    stuFatherJob: $scope.info.stuFatherJob,//学号
                    stuFatherPhone: $scope.info.stuFatherPhone,//学号
                    stuMotherName: $scope.info.stuMotherName,//学号
                    stuMotherJob: $scope.info.stuMotherJob,//学号
                    stuMotherPhone: $scope.info.stuMotherPhone,//学号
                    beginTime: '',
                    endTime: ''
                };

                if (info.stuSchoolTime != '' && info.stuSchoolTime != null) {
                    info.stuSchoolTime = info.stuSchoolTime.format("yyyyMMdd");
                }
                if (info.stuGraduateDate != '' && info.stuGraduateDate != null) {
                    info.stuGraduateDate = info.stuGraduateDate.format("yyyyMMdd");
                }
                if (info.stuBirthTime != '' && info.stuBirthTime != null) {
                    info.stuBirthTime = info.stuBirthTime.format("yyyyMMdd");
                }

                StudentService.SaveStu(info).then(function (resp) {
                    if (resp.data == 0) {
                        alert('学号,姓名,班级编号不能为空');
                    } else if (resp.data == -1) {
                        alert('班级不存在');
                    } else {
                        alert("保存成功");
                        $state.go('StuInfo');
                    }
                }).catch(function (err) {
                    alert("保存失败");
                })
            }
        }, function (error) {
        });

    }
})();