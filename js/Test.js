define([
  'require', 'jquery', 'Store', 'Component'
], function (require) {
    var component = require('Component');
    var Test = component.create({
        name : 'test',

        init : function() {
            console.log('test init');
            console.log(this);
            console.log(this.state);
        },

        shouldUpdate : function() {
            // 상태가 변경되었는지 판단하여 render를 다시할지 결정한다.
            // 객체 비교를 단순화 하기위해 immutable한 객체를 사용.
        	// return boolean
        },

        render : function() {
            console.log('test render()');
        },

    });
    console.log(Test);
    return Test;
});
