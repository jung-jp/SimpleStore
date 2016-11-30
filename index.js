require.config({
    baseUrl: '/js/component',
    paths: {
        'jquery' : '/js/libs/jquery-1.11.1.min',
        'Store' : '/libs/dataFlow/Store',
        'Component' : '/libs/dataFlow/Component',
        'DataSet' : '/libs/dataFlow/DataSet',
    },
    urlArgs : 'ts=' + (new Date()).getTime()
});

require([
    'require', 'jquery', 'Store'
], function (require, $, Store) {
    'use strict';
    var Hello = Store.createStore({
        name: 'Hello',
    }).registerComponent([
        require('Hello'),
        // ...
    ]).init(defaultState);
});
