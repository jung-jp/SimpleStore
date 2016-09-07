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
  'require', 'jquery', 'modernizr', 'DataSet', 'Store',
  'JobCategory', 'Career', 'Preferred', 'Test', 'sampleMock'
], function (require) {
    'use strict'
    var modernizr = require('modernizr'),
        dataSet = require('DataSet'),
        store = require('Store'),
        components = [
            require('Test'),
            require('JobCategory'),
            require('Career'),
            require('Preferred')
        ];

    var recruitStore = Object.assign({}, store, {
        name : 'recruitStore'
        /**
         * 추가함수 구현
         *  ...
         */
    }).registerComponent(components)
      .init(require('sampleMock'));

    // console.log(recruitStore);
    window.recruitStore = recruitStore;

});
