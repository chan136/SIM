(function () {
    'use strict';

    angular
        .module('app.test')
        .controller('testController', testController);

    testController.$inject = ['testService'];

    function testController(testService) {
        var vm = this;
        vm.test = test;

        function test() {
            testService.test().then(function (resp) {
                vm.data = resp;
            }, function (error) {
            });
        }
    }
})();