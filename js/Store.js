define([
  'require', 'jquery',  'modernizr', 'DataSet'
], function (require) {
    var DataSet = require('DataSet');
    var Store = {

        name : 'Store',

        state : new DataSet(),

        listeners : {
            'default' : []
        },

        components : [],

        init : function(data) {
            this.initState();
            this.setState(data);
            return this;
        },

        initState : function(category) {
            this.execute(category, 'init');
        },

        render : function(category) {
            this.execute(category, 'render');
            this.watchComponent();
        },

        execute : function(cate, method) {
            var comps = this.components;
            if( !!cate ) {
                comps = [];
                var categorys = typeof cate == 'string' ? [cate] : cate
                this.components.forEach(function(obj, idx) {
                    if( categorys.indexOf(obj.name) > -1 ) {
                        comps.push(obj);
                    }
                });
            }

            comps.forEach(function(obj, idx) {
                if ( obj['shouldUpdate']() !== false ) {
                    !!obj[method] && obj[method]();
                }
            });

        },

        setState : function(data, cate) {
            this.state.setData(data, cate);
            // this.emit(category, param);
            this.render(cate);
        },

        getState : function(cate) {
            return this.state.getData(cate);
        },

        // 모듈 추가.
        registerComponent : function(components) {
            components.forEach(function(obj, idx) {
                obj.store = this;
                this.components.push(obj);
            }.bind(this));
            return this;
        },

        addListener : function(listen, cate) {
            cate = cate || 'default';
            if ( typeof this.listeners[cate] == 'undefined' ) {
                this.listeners[cate] = [];
            }
            var result = [];
            listen.forEach(function(item) {
                if (this.listeners[cate].indexOf(item) < 0) result.push(item);
            }.bind(this));
            this.listeners[cate] = result;
        },

        // :: 사용안함... 삭제 할듯~ ::
        createStore : function(o) {
            var i;
            for ( i in Store ) {
                if ( Store.hasOwnProperty(i)
                    //&& typeof Store[i] === 'function'
                ) {
                   o[i] = Store[i];
                }
            }
            o.listeners = {'default':[]};
            return o;
        },

        /**
         * 연관성 있는 컴포넌트 실행.
         * @return {[type]} [description]
         */
        watchComponent : function() {
            var listeners = Object.assign({},this.listeners);
            var dependency = [];
            Object.keys(listeners).forEach(function(obj, k) {
                listeners[obj].forEach(function(item) {
                    if( dependency.indexOf(item) < 0 ) {
                        dependency.push(item);
                    }
                });
            });
            console.log('>>>>>>>>>>>>>>>watchComponen');
            console.log(dependency);
            this.execute(dependency, 'render');
            console.log('watchComponent<<<<<<<<<<<<<<<<');
        },

        // 이벤트 구독 등록 : 완전히 구현되지 않음..
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

        // 구독 해지 : 완전히 구현되지 않음..
        remove : function( type, fn, context ) {
            this.emitListener('unsubscribe', type, fn, context);
        },

        /**
         * 발행 : 완전히 구현되지 않음..
         * type : category, publication : 파라미터.. 필요없을 듯.
         */
        emit : function( type, param ) {
            this.emitListener('publish', type, param);
        },

        /**
         * 브로드 캐스팅 : 완전히 구현되지 않음..
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
        }
    };

    return Store;
});
