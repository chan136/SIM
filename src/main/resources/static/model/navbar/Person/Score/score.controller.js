(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('ScoreCtrl', ScoreCtrl);

    ScoreCtrl.$inject = ['testService', '$scope', '$filter', 'toaster', 'StudentService'];

    function ScoreCtrl(testService, $scope, $filter, toaster, StudentService) {
        testService.test().then(function (userData) {
            // userData.username
            console.log("userData.username",userData.username);
            StudentService.getStudentInfoScore(userData.username).then(function (resp) {
                console.log(resp.data);
                $scope.list=resp.data[0];
                $scope.detail=resp.data;

            })
        }, function (error) {
        });
    };
})();