require.config({
    baseUrl: '/js/',
    paths: {
        'jquery': 'vendor/jquery-1.12.0.min',
        'modernizr': 'vendor/modernizr-2.8.3.min',
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

    var recruitStore = Object.assign({}, store, {
        name : 'recruitStore',
        getId : (function() {
            var cached = {};
            return function(id){
                var v;
                if(v = cached[id]) return v;
                if(v = doc.getElementById(id)) return cached[id] = v;
            };
        })(),

    });

    var components = [
        {'jobCategory'  : new JobCategory(recruitStore)},
        ,{'career'      : new Career(recruitStore)},
        //,{'preferred'    : new Preferred(recruitStore)}
    ];
    recruitStore.registerComponent(components).initState();
    recruitStore.setState({
        'career' : ['1','2'],
        "jobCategory" : [
            {
                "keyword" : '12',
                "keywordName": '기업 영업',
                'codeName' : '영업·고객상담',
                'code' : '123'
            },
            {
                "keyword" : '1234',
                "keywordName": '기술 영업 화이팅',
                'codeName' : '영업·고객상담',
                'code' : '123'
            },
            {
                "keyword" : '654',
                "keywordName": 'FE개발자',
                'codeName' : 'SI 업체',
                'code' : '456'
            },
            {
                "keyword" : '04563',
                "keywordName": '풀스택노가다',
                'codeName' : '"SI 업체',
                'code' : '456'
            }
        ]
    });
    // console.log(recruitStore);
    window.recruitStore = recruitStore;

});
