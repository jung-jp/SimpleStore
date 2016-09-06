define([
  'require', 'jquery',  'modernizr', 'DataSet'
], function (require) {
    var DataSet = require('DataSet');
    var Store = {

        name : 'Store',

        state : new DataSet(),

        listeners : {
            default : []
        },

        reducers : [],

        // 이벤트 구독 등록
        on : function( fn, type, context ) {
            type = type || 'default';
            fn = typeof fn === 'function' ? fn : context[fn];

            if ( typeof this.listeners[type] == 'undefined' ) {
                this.listeners[type] = [];
            }

            this.listeners[type].push({
                fn : fn,
                context : context || this
            });
        },
        // 구독 해지
        remove : function( type, fn, context ) {
            this.emitListener('unsubscribe', type, fn, context);
        },
        /**
         * 발행
         * type : category, publication : 파라미터.. 필요없을 듯.
         */
        emit : function( type, param ) {
            this.emitListener('publish', type, param);
        },

        /**
         * 브로드 캐스팅
         * action : 액션타입(추가?삭제), type : 카테고리,
         */
        emitListener : function(action, type, arg, context) {
            var pubtype =  type || 'default',
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

        initState : function(category) {
            this.execute(category, 'init');
        },

        render : function(category) {
            this.execute(category, 'render');
        },

        execute : function(category, method) {
            var reducers = [];
            if( !!category ) {
                this.reducers.forEach(function(obj, idx) {
                    if ( Object.keys(obj).shift() == category ) {
                        return reducers.push(obj);
                    }
                });
            } else {
                reducers = this.reducers;
            }

            reducers.forEach(function(obj, idx) {
                obj[Object.keys(obj).shift()][method]();
            });
        },

        setState : function(data, category) {
            this.state.setData(data, category);
            // this.emit(category, param);
            this.render(category);
        },

        getState : function(category) {
            return this.state.getData(category);
        },

        createStore : function(o) {
            var i;
            for ( i in Store ) {
                if ( Store.hasOwnProperty(i)
                    //&& typeof Store[i] === 'function'
                ) {
                   o[i] = Store[i];
                }
            }
            o.listeners = {default : []};
            return o;
        },

        // 모듈(Reducer) 추가.
        combineReducers : function(reducers) {
            reducers.forEach(function(obj, idx) {
                this.reducers.push(obj);
            }.bind(this));
            return this;
        }
    };

    return Store;
});
