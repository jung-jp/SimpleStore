/**
 *
 */
var dataSet = {
    data : {
        "job_category" : {//storeKey
            "123": {//code
                "name": "영업·고객상담",
                "keyword": {
                    "12" : "기업 영업",
                    "2343" : "기술 영업 화이팅"
                }
            },
            "456": {//code
                "name": "SI 업체",
                "keyword": {
                    "654" : "FE개발자",
                    "04563" : "풀스택노가다"
                }
            }
        }
        category_2 : {},
        category_3 : {},
        category_4 : {},
        category_5 : {},
    },

    setData : function(data, category) {
        if ( !!category ) {
            this.data[category] = data;
        } else {
            this.data = data;
        }
    },

    getData : function(category) {
        if ( !!category ) {
            return this.data[category];
        } else {
            return data;
        }
    },

    dataStringify : function() {
        return JSON.stringify(this.data);
    }

};

/**
 *
 */
var Store = {

    data : new dataSet(),

    listeners : {
        any : []
    },
    // dispatch 역할, stroe에 의존성을 등록
    on : function( fn, type, context ) {
        type = type || 'any';
        fn = typeof fn === 'function' ? fn : context[fn];

        if ( typeof this.listeners[type] == 'undefined' ) {
            this.listeners[type] = [];
        }

        this.listeners[type].push({
            fn : fn,
            context : context || this
        });
    },
    // 리스너 해지
    remove : function( type, fn, context ) {
        this.emitListener('unsubscribe', type, fn, context);
    },
    /**
     * 리스너 실행
     * type : category, publication : 파라미터.. 필요없을 듯.
     */
    execute : function( type, publication ) {
        this.emitListener('publish', type, publication);
    },

    /**
     * 브로드 캐스팅
     * action : 액션타입(추가?삭제), type : 카테고리,
     */
    emitListener : function(action, type, arg, context) {
        var pubtype =  type || 'any',
            listeners = this.listeners[pubtype],
            i,
            max = listeners.length;

        for ( i = 0; i < max; i++ ) {
            if ( action === 'publish' ) {
                listeners[i].fn.call(listeners[i].context, arg);
            } else {
                if ( listeners[i].fn === arg &&
                     listeners[i].context === context) {
                    listeners.splice(i, 1)
                }
            }
        }
    },

    setState : function(data, categoryKey) {
        data.setData(data, categoryKey);
        this.execute(categoryKey);
    },

    getState : function(category) {
        return data.setData(category);
    }

    connect : function(o) {
        var i;
        for ( i in Store ) {
            if ( Store.hasOwnProperty(i) &&
                 typeof Store[i] === 'function' ) {
               o[i] = Store[i];
            }
        }
        o.listeners = {any : []};
    },

};

function createStore() {
    var args = Array.prototype.slice.call(arguments),
        modules = ( args[0] && typeof args[0] === 'string' ? args :  args[0] ),
        i;

    // 함수가 생성자로 호출되도록 보장한다.
    if ( !(this instanceof createStore) ) {
        return new createStore(modules);
    }

    // 코어 this 객체에 모듈을 추가한다.
    // 모듈이 없거나 * 이면 사용 가능한 모든 모듈을 사용한다는 의미.
    if ( !modules || modules === '*' || modules[0] === '*' ) {
        modules = [];
        console.log(createStore.modules);
        for ( i in createStore.modules ) {
            console.log(1);
            if ( createStore.modules.hasOwnProperty(i) ) {
                console.log(2);
                createStore.push(i);
            }
        }
    }

    // 필요한 모듈을 초기화 한다.
    for ( i = 0; i < modules.length; i += 1 ) {
        createStore.modules[modules[i]].bind(this);
    }
}

function createStore() {
    var args = Array.prototype.slice.call(arguments),
        modules = ( args[0] && typeof args[0] === 'string' ? args :  args[0] ),
        i;

    // 함수가 생성자로 호출되도록 보장한다.
    if ( !(this instanceof createStore) ) {
        return new createStore(modules);
    }

    // 코어 this 객체에 모듈을 추가한다.
    // 모듈이 없거나 * 이면 사용 가능한 모든 모듈을 사용한다는 의미.
    if ( !modules || modules === '*' || modules[0] === '*' ) {
        modules = [];
        // console.log(createStore.modules);
        for ( i in createStore.modules ) {
            // console.log(1);
            if ( createStore.modules.hasOwnProperty(i) ) {
                console.log(2);
                createStore.push(i);
            }
        }
    }

    // 필요한 모듈을 초기화 한다.
    for ( i = 0; i < modules.length; i += 1 ) {
        createStore.modules[modules[i]].bind(this);
    }
}


/**
 *
 */
var recruitStore = createStore([
    jobCategoryReducer,
    preferred
]);

/**
 * 직종
 *  - auto-compleate
 */
var jobCategoryReducer = function() {
    init : function() {

    },

    autoComplete : function() {

    },

    render : function() {

    },

};

/**
 * 우대사항
 */
var preferred = function() {
    render : function() {

    }
}

// -----------------------------


//
//

var job = {
    // 필요에 따라 다음과 같이 Sandbox 프로토타입에 접근할 수 있다.
    // box.constructor.prototype.m = 'mmm';
    init : function(){
        console.log('job init');
    },
    render : function(){
        console.log('job render');
    }
}
var career = {
    init : function(){
        console.log('career init');
    },
    render :  function(){
        console.log('career render');
    }
}

var o = Object.assign({}, {'job':job}, {'career':career});
dispatch :
