define([
  'require', 'DataSet'
], function (require) {

    var DataSet = require('DataSet');

    var Store = {

        name : 'Store',
        state : new DataSet(),
        components : [],
        lastExecuteComponent : [],
        watchComponents : {'default' : []},
        triggers : {'default' : []},

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
            this.emitWatchComponent();
        },

        execute : function(cate, method) {
            var comps = this.components,
                lastExecute = [];
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
                    if( !!obj[method] ) {
                         obj[method]();
                        if( method == 'render' ) lastExecute.push(obj.name);
                    }
                }
            });

            this.lastExecuteComponent = lastExecute;
        },

        setState : function(data, cate, isRender) {
            isRender = isRender || true;
            this.state.setData(data, cate);
            if( isRender ) {
                this.render(cate);
            }
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

        watchComponent : function(listen, cate) {
            cate = cate || 'default';
            if ( typeof this.watchComponents[cate] == 'undefined' ) {
                this.watchComponents[cate] = [];
            }
            var result = [];
            listen.forEach(function(item) {
                if (this.watchComponents[cate].indexOf(item) < 0) result.push(item);
            }.bind(this));
            this.watchComponents[cate] = result;
        },

        /**
         * 연관성 있는 컴포넌트 실행.
         * @return {[type]} [description]
         */
        emitWatchComponent : function() {
            var watchComponents = this.watchComponents;
            var lastExecute = this.lastExecuteComponent;
            var dependency = [];
            lastExecute.forEach(function(comp) {
                Object.keys(watchComponents).forEach(function(cate){
                    if ( watchComponents[cate].indexOf(comp) !== -1 ) {
                        if( dependency.indexOf(cate) === -1 ) {
                            dependency.push(cate);
                        }
                    }
                });
            });
            this.execute(dependency, 'render');
        },

        // 이벤트 트리거 등록
        addTrigger : function(key, fn) {
            key = key || 'default';
            if ( typeof this.triggers[key] == 'undefined' ) {
                this.triggers[key] = [];
            }

            this.triggers[key].push(fn);
        },

        // 구독 해지 : 완전히 구현되지 않음..
        removeTrigger : function(key) {
            var key =  key || 'default',
                triggers = this.triggers[key];
            triggers = this.triggers[key];
            triggers.splice(i, 1)
        },

        /**
         * 발행 : 완전히 구현되지 않음..
         * type : category, publication : 파라미터.. 필요없을 듯.qhso
         */
        shoot : function(key) {
            try {
                this.emitListener(key);
            } catch(e) {
                !!console && console.log(e);
            }
        },

        /**
         * 브로드 캐스팅 : 완전히 구현되지 않음..
         * action : 액션타입(추가?삭제), type : 카테고리,
         */
        emitListener : function(key) {
            var key =  key || 'default',
                triggers = this.triggers[key];
            if( !!triggers ) {
                triggers.forEach(function(fn, i) {
                    fn();
                });
            } else {
                throw Error('triggers undefined');
            }
        },


        // :: 사용안함... 삭제 예정 ::
        // createStore : function(o) {
        //     var i;
        //     for ( i in Store ) {
        //         if ( Store.hasOwnProperty(i)
        //             //&& typeof Store[i] === 'function'
        //         ) {
        //            o[i] = Store[i];
        //         }
        //     }
        //     return o;
        // },
        //

        __end__:{}
    };

    return Store;
});
