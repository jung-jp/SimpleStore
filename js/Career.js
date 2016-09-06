define([
  'require', 'jquery', 'Store'
], function (require) {

    function F(store) {
        this.name = 'career';
        this.store = store || require('Store');

        $('#career').on('click', 'input[type=checkbox]', function(e) {
            var career = []
            $(e.delegateTarget).find(':checkbox:checked').each(function() {
                career.push(this.value);
            });
            this.setState(career);
        }.bind(this));
    };

    F.prototype.init = function () {
        console.log('Career init()');
    };

    F.prototype.setState = function(data) {
        this.store.setState(data, this.name);
    };

    F.prototype.render = function () {
        console.log(this.store.getState());
        var state = this.store.getState();
        $('#career').find(':checkbox').each(function() {
            if ( state.career.indexOf(this.value) > -1 ) {
                this.checked = true;
            }
        });

    };

    // Career.prototype.action = function (cate, data) {
    //     var action = {
    //         'career' : function(data){
    //
    //         }.bind(this)
    //     };
    //     !!action[cate] && action[cate]();
    // }

    return F
});
