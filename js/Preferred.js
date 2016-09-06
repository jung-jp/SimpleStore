define([
    'require', 'jquery',  'modernizr',  'Store'
], function (require) {

    function Preferred(store) {
        this.store = store || require('Store');;
    }

    Preferred.prototype.init = function () {
        console.log('Preferred init()');
    };

    Preferred.prototype.render = function () {
        console.log('Preferred render()');
    };

    return Preferred;
});
