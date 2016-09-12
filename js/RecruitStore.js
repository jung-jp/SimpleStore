require.config({
    baseUrl: '/js/',
    paths: {
        'jquery': 'vendor/jquery-1.12.0.min',
        'modernizr': 'vendor/modernizr-2.8.3.min',
        'sampleMock': '/js/data/sampleMock'
    },
    shim: {
        'modernizr' : {
            exports: 'Modernizr'
        }
    }
});

require([
    'require', 'jquery', 'Store',
    'JobCategory', 'Career', 'Preferred', 'EventBinding'
], function (require) {
    'use strict';
    var Store = require('Store'),
        components = [
            require('JobCategory'),
            require('Career'),
            require('Preferred')
        ];

    window.RecruitStore = Object.assign({}, Store, {
        name: 'RecruitStore'
        /**
         * 추가함수 구현
         *  ...
         */
    }).registerComponent(components)
        .init()
    //.init(data)
    ;
});
