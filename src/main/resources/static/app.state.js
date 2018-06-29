(function () {
    'use strict';
    angular
        .module('app')
        .config(routerConfig);

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$localStorageProvider', '$sessionStorageProvider', '$httpProvider'];

    function routerConfig($stateProvider, $urlRouterProvider, $localStorageProvider, $sessionStorageProvider, $httpProvider) {
        $stateProvider
            .state('appStart', {
                abstract: true,
                views: {
                    'navbar@': {
                        templateUrl: 'model/navbar/navbar.html',
                        controller: 'navbarCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('login', {
                parent: 'appStart',
                url: '/login',
                params: {"message": null},
                views: {
                    'content@': {
                        templateUrl: 'model/login/login.html',
                        controller: 'loginController',
                        controllerAs: 'vm'
                    }
                }

            })

            .state('Info', {
                parent: 'appStart',
                url: '/Info',
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Person/Info/info.html',
                        controller: 'InfoCtrl',
                        controllerAs: 'vm'
                    }
                }

            })

            .state('CourseChoose', {
                parent: 'appStart',
                url: '/CourseChoose',
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Person/CourseChoose/courseChoose.html',
                        controller: 'CourseChooseCtrl',
                        controllerAs: 'vm'
                    }
                }

            })

            .state('OnlineChoose', {
                parent: 'appStart',
                url: '/OnlineChoose',
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Person/OnlineChoose/onlineChoose.html',
                        controller: 'OnlineChooseCtrl',
                        controllerAs: 'vm'
                    }
                }

            })

            .state('Table', {
                parent: 'appStart',
                url: '/Table',
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Person/CourseTable/courseTable.html',
                        controller: 'TableCtrl',
                        controllerAs: 'vm'
                    }
                }

            })

            .state('Score', {
                parent: 'appStart',
                url: '/Score',
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Person/Score/score.html',
                        controller: 'ScoreCtrl',
                        controllerAs: 'vm'
                    }
                }

            })

            .state('home', {
                parent: 'appStart',
                url: '/home',
                cache:false,
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/home/home.html',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('StuInfo', {
                parent: 'appStart',
                url: '/StuInfo',
                cache:false,
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Student/StuInfo/StuInfo.html',
                        controller: 'StuInfoCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('StuInfoMore', {
                // parent: 'appStart',
                params:{item:null},
                url: '/StuInfo/more',
                cache:false,
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Student/StuInfo/StuInfoMore.html',
                        controller: 'StuInfoMoreCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('StuInfoAdd', {
                url: '/StuInfo/add',
                cache:false,
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Student/StuInfo/StuInfoAdd.html',
                        controller: 'StuInfoAddCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('StuGrade', {
                parent: 'appStart',
                url: '/StuGrade',
                cache:false,
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Student/StuGrade/StuGrade.html',
                        controller: 'StuGradeCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('StuCourse', {
                parent: 'appStart',
                url: '/StuCourse',
                cache:false,
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Student/StuCourse/StuCourse.html',
                        controller: 'StuCourseCtrl',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('StuSchedule', {
                parent: 'appStart',
                url: '/CourPlan',
                cache:false,
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Student/StuSchedule/StuSchedule.html',
                        controller: 'StuScheduleCtrl',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('TeaInfo', {
                parent: 'appStart',
                url: '/TeaInfo',
                cache:false,
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Teacher/teaInfo/teaInfo.html',
                        controller: 'TeaInfoCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('TeaLesson', {
                parent: 'appStart',
                url: '/TeaCourse',
                cache:false,
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Teacher/teaCourse/teaCourse.html',
                        controller: 'TeaLessonCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('schoolTeaching', {
                parent: 'appStart',
                url: '/TeaClass',
                cache:false,
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Teacher/teaClass/teaClass.html',
                        controller: 'schoolTeachingCtrl',
                        controllerAs: 'vm'
                    }
                }
            })


            .state('CourInfo', {
                parent: 'appStart',
                url: '/CourInfo',
                cache:false,
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Course/CourInfo/CourInfo.html',
                        controller: 'CourInfoCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('CourseSetting', {
                parent: 'appStart',
                url: '/CourSetting',
                cache:false,
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Course/CourSetting/CourSetting.html',
                        controller: 'CourseSettingCtrl',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('class', {
                parent: 'appStart',
                url: '/Class',
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/Class/Class.html',
                        controller: 'ClassInfoCtrl',
                        controllerAs: 'vm'
                    }
                }

            })

            .state('user', {
                parent: 'appStart',
                url: '/User',
                views: {
                    'content@': {
                        templateUrl: 'model/navbar/User/user.html',
                        controller: 'UserCtrl',
                        controllerAs: 'vm'
                    }
                }

            });

        $urlRouterProvider.otherwise('/home');
        $localStorageProvider.setKeyPrefix('iplat4j-');
        $sessionStorageProvider.setKeyPrefix('iplat4j-');


    }
})();


