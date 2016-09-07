define([
  'require', 'jquery', 'Component'
], function (require) {

    return require('Component').create({

        name : 'Preferred',

        init : function () {
            console.log('preferred init()');
        },

        render : function () {
            console.log('preferred render()');
        }
    });
});
