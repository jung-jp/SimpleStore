define([
  'require', 'jquery',  'modernizr', 'DataSet'
], function (require) {

    var Component = {
        init : function() {

        },

        /**
         * 상태가 변경되었는지 판단하여 render를 실행할지 결정한다.
         * @return {[boolean]} [description]
         */
        shouldUpdate : function() {
        	return true;
        },

        /**
         * 각 콤포넌트에서 화면에 출력하는 부분을 담당.
         * @return {[type]} [description]
         */
        render : function() {

        },

        /**
         * 컴포넌트가 변경될때 연관있는 다른 컴포넌트를 정의.
         * @return {[type]} [description]
         */
        watchComponent : function(args, category) {
            category = category || this.name;
            !!this.store && this.store.watchComponent(args, category);
        },

        addTrigger : function(key, fn, context) {
            context = context || this;
            !!this.store && this.store.addTrigger(key, fn, context);
        },

        removeTrigger : function(key) {
            !!this.store && this.store.removeTrigger(key);
        },

        shoot : function(key) {
            !!this.store && this.store.shoot(key);
        },

        /**
         * 상태를 store에 저장
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        setState : function(data, category) {
            category = category || this.name;
            !!this.store &&  this.store.setState(data, category);
        },

        /**
         * 자식 콤포넌트 생성시. 상속??
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
        create : function(obj) {
            //return Object.create(Component.prototype, o);
            var i, o = {};
            for ( i in Component ) {
                if ( Component.hasOwnProperty(i)
                    && typeof Component[i] === 'function'
                    && typeof Component[i] !== 'create'
                ) {
                   o[i] = Component[i];
                }
            }
            for ( i in obj ) {
                if ( obj.hasOwnProperty(i) ) {
                   o[i] = obj[i];
                }
            }
            return o;
        }
    }
    return Component;
});
