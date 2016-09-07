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
        },

        initState : function(category) {
            this.execute(category, 'init');
        },

        render : function(category) {
            this.execute(category, 'render');
        },

        execute : function(category, method) {
            var components = [];
            if( !!category ) {
                this.components.forEach(function(obj, idx) {
                    if ( obj.name == category ) {
                        return components.push(obj);
                    }
                });
            } else {
                components = this.components;
            }

            components.forEach(function(obj, idx) {
                if( !!obj['shouldUpdate'] ) {
                     if ( obj['shouldUpdate']() !== false ) {
                         !!obj[method] && obj[method]();
                     }
                } else {
                    !!obj[method] && obj[method]();
                }
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
            o.listeners = {'default':[]};
            return o;
        },

        // 모듈 추가.
        registerComponent : function(components) {
            components.forEach(function(obj, idx) {
                obj.store = this;
                this.components.push(obj);
            }.bind(this));
            return this;
        },

        /**
         * 복잡한 조건에서 런더링을 판단하기 위한 처리..
         * @return {[type]} [description]
         */
        complexRenderCondition : function() {
            return this;
        }
    };

    return Store;
});
