var Store = {

    data : new dataSet(),

    listeners : {
        any : []
    },
    reducers : [],
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

    createStore : function(o) {
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
define(Store);