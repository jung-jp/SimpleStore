
define([
    'require', 'Store'
], function () {

    /**
     * 컴포넌트를 만들기 위한 추상 객체 <br/><br/>
     *  - 컴포넌트 생성시 필요한 기본 메소드와 로직처리를 위한 메소드 구현 <br/>
     *  - Store 접근을 위한 메소드 오버라이드
     * @type {Object}
     * @exports Component
     */
    var Component = {
        /**
         * 컴포넌트 명
         * @type {string}
         */
        name: 'Component',
        
        /**
         * Store 객체
         * @type {object}
         */
        store: require('Store'),

        /**
         * 초기화
         * @abstract
         */
        init: function () {

        },

        /**
         * 상태를 초기화 한다.
         * @param {object} data
         */
        initState : function(data) {
            this.store.setState(Object.assign({}, data, this.getState()), false, this.name);
        },

        /**
         * 상태가 변경되면 실행되는 메소드로 컴포넌트의 render()를 실행할지 판단한다.
         * @abstract
         * @returns {boolean}
         */
        shouldUpdate: function () {
            return true;
        },

        /**
         * 콤포넌트에서 화면에 출력하는 부분을 담당.
         * @abstract
         * @returns {boolean}
         */
        render: function () {

        },

        /**
         * Store의 watchComponent 호출
         * @param {array} args
         * @param {string} category
         */
        watchComponent: function (args, category) {
            category = category || this.name;
            this.store.watchComponent(args, category);
        },

        /**
         * Store의 addTrigger 호출
         * @param {string} key
         * @param {function} fn
         * @param {object} context
         */
        addTrigger: function (key, fn, context) {
            context = context || this;
            this.store.addTrigger(key, fn, context);
        },

        /**
         * Store의 removeTrigger 호출
         * @param {string} key
         */
        removeTrigger: function (key) {
            this.store.removeTrigger(key);
        },

        /**
         * Store의 pullTrigger 호출
         * @param {string} key
         * @param {object} obj 파라미터를 객체로 전달한다.
         */
        pullTrigger: function (key, obj) {
            this.store.pullTrigger(key, obj);
        },

        /**
         * 상태를 Store에 저장하고 render()를 실행한다.
         * @param {object} data
         * @param {boolean} isRender
         * @param {string} category
         */
        setState: function (data, isRender, category) {
            category = category || this.name;
            isRender = isRender !== false;
            if (Object.prototype.toString.call(data) === '[object Object]') {
                data = Object.assign({}, this.getState(category), data);
            }
            this.store.setState(data, isRender, category);
        },

        /**
         * 복제된 state를 반환한다.
         * 열거 가능한 자체 속성만 복사된다.(완전한 깊은복사는 아님)
         * @param {string} category
         */
        getState: function (category) {
            category = category || this.name;
            return Object.assign({}, this.store.getState(category));
        },

        /**
         * 모든 상태를 반환하다.
         * @returns {*} state
         */
        getStateAll: function () {
            return this.store.getState();
        },

        /**
         * 자식 콤포넌트 생성시 속성이 상속된(복사) 새로운 객체를 반환.
         * @param  {{}} obj - 구현할 컴포넌트 객체
         * @return {{}} component - 상속된 컴포넌트 객체
         */
        create: function (obj) {
            //return Object.create(Component.prototype, o);
            var i, o = {};
            for (i in Component) {
                if (Component.hasOwnProperty(i) &&
                    typeof Component[i] === 'function' &&
                    Component[i].name !== 'create'
                ) {
                    o[i] = Component[i];
                }
            }
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    o[i] = obj[i];
                }
            }
            return o;
        }

    };
    return Component;
});
