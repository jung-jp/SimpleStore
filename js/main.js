require.config({
    baseUrl: '/js/',
    paths: {
        'jquery': 'vendor/jquery-1.12.0.min',
        'modernizr': 'vendor/modernizr-2.8.3.min'
    },
    shim: {
        'modernizr' : {
            exports: 'Modernizr'
        }
    }
});

require([
  'require', 'jquery', 'modernizr', 'DataSet', 'Store',
  'JobCategory', 'Career', 'Preferred'
], function (require) {
    'use strict'
    var modernizr = require('modernizr');
    var dataSet = require('DataSet');
    var store = require('Store');
    var JobCategory = require('JobCategory');
    var Career = require('Career');
    var Preferred = require('Preferred');

    var reducers = [
        {'jobCategory'  : new JobCategory(store)},
        {'career'       : new Career(store)},
        {'preferred'    : new Preferred(store)}
    ];

    var recruitStore = {
        name : 'recruitStore'
    };
    recruitStore = Object.assign({}, store, recruitStore);
    recruitStore.combineReducers(reducers).initState();

    // console.log(recruitStore);
    // window.recruitStore = recruitStore;

});
