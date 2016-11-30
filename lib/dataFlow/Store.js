
define([
    'require', 'DataSet'
], function (require, DataSet) {

    /**
     * DataStore를 만들기 위한 추상 객체. <br/> <br/>
     *  - 애플리캐이션의 상태와 컴포넌트(모듈)를 관리. <br/>
     *  - 상태가 변경되면 등록된 컴포넌트의 render()를 실행한다.
     * @type {Object}
     * @exports Store
     */
    var Store = {
        /** 모듈 명 */
        name: 'Store',
        /** 상태 객체 */
        state: new DataSet(),
        /** 컴포넌트 리스트 */
        components: [],
        /** 마지막 실행된 컬포는트 리스트 */
        lastExecuteComponent: [],
        /** watchComponents 리스트 */
        watchComponents: {'default': []},
        /** 마지막 실행된 Watch 컬포는트 리스트 */
        lastWatchComponents: [],
        /** 트리거 리스트 */
        triggers: {'default': []},

        /**
         * 초기화를 실행한다.
         * @param  {object} data - 초기화 데이터
         * @return {object} Store - 메소드 체이닝을 사용하기 위해 자신을 리턴한다.
         */
        init: function (data) {
            this.setState(data);
            this.initComponent();
            this.render();

            return this;
        },

        /**
         * 등록된 컴포넌트의 init()을 실행
         * @param  {string} category - 카테고리 명
         */
        initComponent: function (category) {
            this.execute(category, 'init');
        },

        /**
         * 등록된 컴포넌트의 render()를 실행
         * @param  {string} category - 카테고리 명
         */
        render: function (category) {
            this.execute(category, 'render');
        },

        /**
         * 키와 메소드명를 받아서 컴포넌트를 브로드캐스팅 한다.
         * @param  {string} cate - 카테고리 명
         * @param  {string} method - 메소드 이름
         */
        execute: function (cate, method) {
            var comps = this.components,
                lastExecute = [];

            cate = cate || [];
            if (typeof cate === 'string' || cate.length > 0) {
                    comps = [];
                    var categories = typeof cate === 'string' ? [cate] : cate;
                    this.components.forEach(function (obj) {
                        if (categories.indexOf(obj.name) > -1) {
                            comps.push(obj);
                        }
                });
            }

            comps.forEach(function (obj) {
                if ( !!obj[method] ) {
                    if( method === 'render' && obj.shouldUpdate() !== false ) {
                        obj[method]();
                        lastExecute.push(obj.name);
                    } else {
                        obj[method]();
                    }
                }
            }.bind(this));

            this.lastExecuteComponent = lastExecute;
        },

        /**
         * 전달받은 상태를 저장하고 render() 실행여부를 처리한다
         * @param {object}  data - 데이터 셋 객체
         * @param {Boolean} isRender - 랜더 실행 여부
         * @param {object}  cate - 카테고리 명
         */
        setState: function (data, isRender, cate) {
            this.state.setData(data, cate);
            if (isRender) {
                this.render(cate);
            }

            if ( !!cate && typeof cate === 'string' && cate.length > 0) {
                var watchComponents = this.watchComponents[cate] || [];
                if (watchComponents.length > 0) {
                    this.emitWatchComponent(cate);
                }
            }
        },

        /**
         * 애플리캐이션의 상태를 반환한다.
         * @param  {string} cate - 카테고리 명
         * @return {object} state - 상태 데이터
         */
        getState: function (cate) {
            return this.state.getData(cate);
        },

        /**
         * 컴포넌트를 Store에 등록한다.
         * @param  {array} components - 컴포넌트 객체
         * @param  {string} parentName - sub 컴포넌트일 경우 부모 컴포넌트의 이름(사용안함. 실험적)
         * @return {object} Store - 메소드 체이닝을 사용하기 위해 자신을 리턴한다.
         */
        registerComponent: function (components, parentName) {
            components.forEach(function (obj) {
                obj.store = this;
                obj.parentName = parentName || '';
                this.components.push(obj);
            }.bind(this));
            return this;
        },

        /**
        * 자신과 연관있는 컴포넌트를 등록한다.
        * 자신에게 영향을 주는 다른 컴포넌트의 이름이 등록된다.
        * 바라보고 있는 컴포넌트의 상태가 변경되면 자신의 watchCallback()이 호출된다.
        *
         * @param  {array} listen - 카테고리 목록 배열
         * @param  {string} cate - 키가되는 카테고리 명
         */
        watchComponent: function (listen, cate) {
            cate = cate || 'default';
            if (typeof this.watchComponents[cate] === 'undefined') {
                this.watchComponents[cate] = [];
            }
            listen.forEach(function (item) {
                if (this.watchComponents[item] === undefined) {
                    this.watchComponents[item] = [];
                }
                if (this.watchComponents[item].indexOf(cate) < 0) {
                    this.watchComponents[item].push(cate);
                }
            }.bind(this));
        },

        /**
         * 참조하고 있는 컴포넌트의 콜백을 실행한다.
         * @return {string} cate - 카테고리 명
         */
        emitWatchComponent: function (cate) {
            if (!!cate && typeof cate === 'string') {
                var watchComponents = this.watchComponents[cate] || [],
                    lastWatchComponents = this.lastWatchComponents || [],
                    executeComponents = watchComponents.filter(function(comps) {
                        return lastWatchComponents.indexOf(comps) === -1;
                    });
                if ( executeComponents.length > 0) {
                    this.lastWatchComponents = executeComponents;
                    this.execute(executeComponents, 'watchCallback');
                    this.lastWatchComponents = [];
                }
            }
        },

        /**
         * 트리거를 등록한다.
         * 커스텀 이벤트 발생을 위한 키와 콜백을 등록한다.
         * @param {string} key - 트리커 키
         * @param {function} fn - 콜백 할수
         */

        addTrigger : function(key, fn) {
            key = key || 'default';

            if ( typeof this.triggers[key] === 'undefined' ) {
                this.triggers[key] = [];
            }

            var index = this.triggers[key].findIndex(function(val) {
                return val.toString() === fn.toString();
            });

            if( index === -1 ) {
                this.triggers[key].push(fn);
            }
        },

        /**
         * 등록된 트리거를 삭제한다.
         * @param {string} key - 트리거 키
         */
        removeTrigger : function(key) {
            key =  key || 'default';
            if(!!this.triggers[key]) {
                var index = this.triggers[key].indexOf(key);
                if (index > -1) {
                    this.triggers[key].splice(index, 1);
                }
            }
        },

        /**
         * 커스텀 이벤트를 발생시켜 등록된 callback을 실행한다.
         * @param {string} key - 키가되는 문자열
         * @param {object} jsonObj - 파라미터를 객체형태로 받는다.
         */
        pullTrigger: function (key, jsonObj) {
            jsonObj = jsonObj || {};
            try {
                this.emitListener(key, jsonObj);
            } catch (e) {
                !!console && console.log(e);
            }
        },

        /**
         * 트리거에 등록된 이벤트를 브로드캐스팅 한다.
         * @param {string} key - 키가되는 문자열
         * @param {object} jsonObj - 파라미터를 객체형태로 받는다.
         */
        emitListener: function (key, jsonObj) {
            key = key || 'default';
            jsonObj = jsonObj || {};

            var triggers = this.triggers[key];

            if (!!triggers) {
                triggers.forEach(function (fn) {
                    fn(jsonObj);
                });
            } else {
                throw Error('triggers undefined');
            }
        },

        /**
         * 스토어를 생성하는 메소드
         * @param  {object} obj - 구현된 Store 객체
         * @return {object} obj - 상속된 새로운 Store 객체
         */
        createStore : function(obj) {
            return Object.assign({}, Store, obj);
        }
    };

    return Store;
});
