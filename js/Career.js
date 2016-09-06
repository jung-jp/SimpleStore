define([
  'require', 'jquery', 'Store'
], function (require) {
    function Career(store) {
        this.store = store || require('Store');;
    }

    Career.prototype.init = function () {
        console.log('Career init()');
    };

    Career.prototype.render = function () {
        console.log('Career render()');
    };
    return Career
});
