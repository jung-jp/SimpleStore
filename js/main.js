require.config({
    baseUrl: '/js/vendor/',
    paths: {
        'jquery': 'jquery-1.12.0.min',
        'modernizr': 'modernizr-2.8.3.min'
    },
    shim: {
        'modernizr': {
            exports: 'Modernizr'
        }

    }
});

require([
  'require', 'jquery',  'modernizr',  '../dataStore', '../DataSet',
], function (require) {
    'use strict'
    var modernizr = require('modernizr');
    var dataSet = require('../DataSet');
    var store = require('../dataStore');
    console.log($('#test').val());
    console.log(modernizr);
    console.log(dataSet);


    /**
     * reducer를 하나로 합쳐서.. 스토어를 생성한다.
     */
    var RecruitStore = store.createStore();
    RecruitStore.reducers.push('jobCategory');
    RecruitStore.reducers.push('career');
    RecruitStore.reducers.push('preferred');
    RecruitStore.initState();

    // ex1.
    var RecruitStore = store.createStore([
        {'jobCategory' : jobCategory},
        {'career' : career},
        {'preferred' : preferred},
    ]).initState();

    // ex2.
    RecruitStore.reducers.push('jobCategory');
    RecruitStore.reducers.push('career');
    RecruitStore.reducers.push('preferred');
    RecruitStore.initState();


    store 주입 ??

    reducers.forEach(function(reducer, idx) {
        new reducer(store);
    });

    var RecruitStore = store.createStore([
        {'jobCategory' : new jobCategory(store)},
        {'career' : new career(store)},
        {'preferred' : new preferred(store)},
    ]).initState();
});





