define([
  'require', 'jquery',  'modernizr', 'DataSet'
], function (require) {

    var Component = {
        init : function() {

        },

        shouldUpdate() {
            // 상태가 변경되었는지 판단하여 render를 다시할지 결정한다.
            // 객체 비교를 단순화 하기위해 immutable한 객체를 사용.
        	// return boolean
        	return true;
        },

        render() {

        },

        setState : function(data) {
            if( !!this.store ) {
                this.store.setState(data, this.name);
            }
        },

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
