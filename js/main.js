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
  'require', 'jquery',  'modernizr',  '../DataSet',
], function (require) {
    var modernizr = require('modernizr');
    var dataSet = require('../DataSet');
    
});
