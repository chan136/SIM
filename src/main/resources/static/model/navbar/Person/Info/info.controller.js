(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('InfoCtrl', InfoCtrl);

    InfoCtrl.$inject = ['testService', '$scope',  'StudentService','$state'];

    function InfoCtrl(testService,$scope, StudentService, $state) {

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

            $scope.faceDropDown = [
                {face: '共青团员'},
                {face: '党员'},
                {face: '清白'}
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
                            $state.go('Info');
                        }).catch(function (err) {
                            alert('图片保存失败');
                        })
                    }).catch(function (err) {
                    })
                }
            }

            console.log('userData',userData.username);
            var stuInfo={
                stuNo: userData.username,//学号
                classNo: '',//学号
                stuPhoto: '',//学号
                stuName: '',//学号
                stuSex: '',//学号
                stuBirthTime: '',//学号
                stuProvince: '',//学号
                stuNation: '',//学号
                stuFace: '',//学号
                stuStudyTime: '',//学号
                stuSchoolTime: '',//学号
                stuDormitory: '',//学号
                stuPhone: '',//学号
                stuEMail: '',//学号
                stuPost: '',//学号
                stuID: '',//学号
                stuIsGraduate: '',//学号
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

            StudentService.getStuInfo(stuInfo).then(function (resp) {
                console.log(resp.data);
                $scope.info=resp.data[0]
            }).catch(function (err) {
                console.log(err)
            })

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
                        $state.go('Info');
                    }
                }).catch(function (err) {
                    alert("保存失败");
                })
            }

        }, function (error) {
        });

    }
})();