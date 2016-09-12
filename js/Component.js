/**
 * Created by PhpStorm.
 * User: jp
 * Date: 2016-09-08
 */
define([
    'require', 'Store'
], function () {

    var Component = {
        name: 'Component',
        store: require('Store'),

        init: function () {

        },

        /**
         * 상태가 변경되었는지 판단하여 render를 실행할지 결정한다.
         * @returns {boolean}
         */
        shouldUpdate: function () {
            return true;
        },

        /**
         * 각 콤포넌트에서 화면에 출력하는 부분을 담당.
         * @returns {boolean}
         */
        render: function () {

        },

        /**
         * 컴포넌트가 변경될때 연관있는 다른 컴포넌트를 정의.
         */
        watchComponent: function (args, category) {
            category = category || this.name;
            !!this.store && this.store.watchComponent(args, category);
        },

        addTrigger: function (key, fn, context) {
            context = context || this;
            !!this.store && this.store.addTrigger(key, fn, context);
        },

        removeTrigger: function (key) {
            !!this.store && this.store.removeTrigger(key);
        },

        shoot: function (key) {
            !!this.store && this.store.shoot(key);
        },

        /**
         * 상태를 store에 저장
         * @param data
         * @param category
         */
        setState: function (data, category) {
            category = category || this.name;
            !!this.store && this.store.setState(data, category);
        },

        /**
         * state를 불러 온다.
         * @param category
         */
        getState: function (category) {
            category = category || this.name;
            return this.store.getState(category);
        },

        /**
         * 자식 콤포넌트 생성시. 상속??
         * @param  {{}} obj [description]
         * @return {{}}   [description]
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
