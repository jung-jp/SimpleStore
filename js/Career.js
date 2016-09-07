define([
  'require', 'jquery', 'Store'
], function (require) {

    function Fnc(store) {
        this.name = 'career';
        this.store = store || require('Store');
    };

    Fnc.prototype.init = function () {
        console.log('Career init()');
        $('#career').on('click', 'input[type=checkbox]', function(e) {
            var career = []
            $(e.delegateTarget).find(':checkbox:checked').each(function() {
                career.push(this.value);
            });
            this.setState(career);
        }.bind(this));
    };

    Fnc.prototype.setState = function(data) {
        this.store.setState(data, this.name);
        // this.store.setTemplate(); ??
    };

    Fnc.prototype.shouldUpdate = function() {
        // 상태가 변경되었는지 판단하여 render를 다시할지 결정한다.
        // 객체 비교를 단순화 하기위해 immutable한 객체를 사용.
        // return boolean
        // return case1 || case2 || ...
        var history = Array.prototype.slice(null, this.store.state.history);
        if( Object.equals(history.shift(), history.pop()) ) {
            return false;
        }
    },

    Fnc.prototype.render = function () {
        console.log(this.store.getState());
        var state = this.store.getState();
        $('#career').find(':checkbox').each(function() {
            if ( state.career.indexOf(this.value) > -1 ) {
                this.checked = true;
            }
        });

    };
    return Fnc;
});
