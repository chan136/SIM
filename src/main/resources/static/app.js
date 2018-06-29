(function () {
    'use strict';
    angular.module('app.account', []);//声明模块
})();
(function () {
    'use strict';
    angular.module('app.test', []);//声明模块
})();
(function () {
    'use strict';
    angular.module('app.home', []);//声明模块
})();
(function () {
    'use strict';
    angular.module('app', ['ui.router',
        'app.account',
        'ngStorage',
        'app.home',
        'app.test',
        'toaster',
        'kendo.directives'
    ])//注入模块
})();
(function () {
    'use strict';
    angular
        .module('app')
        .config(coreConfig);
    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];

    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide) {
        var core = angular.module('app');
        core.controller = $controllerProvider.register;
        core.directive = $compileProvider.directive;
        core.filter = $filterProvider.register;
        core.factory = $provide.factory;
        core.service = $provide.service;
        core.constant = $provide.constant;
        core.value = $provide.value;
    }
})();