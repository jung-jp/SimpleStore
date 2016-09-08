var require = {
    baseUrl: '/js/vendor/',
    paths: {
        // 이 설정으로 모듈 이름을 호출하면 값의 위치를 요청한다.
        // ".js"는 자동 추가
        'jquery': 'jquery-1.12.0.min',
        'modernizr': 'modernizr-2.8.3.min',
        'data': '../DataSet'
    },
    shim: {
        'modernizr': {// Modernizr는 전역변수 "Modernizr"를 사용한다.
            exports: 'Modernizr'
        },
        'data': {
            exports: 'dataSet'
        }
    }
};
