define([
  'require', 'jquery', 'Component'
], function (require) {

    return require('Component').create({

        name : 'Career',

        init : function () {
            console.log('Career init()');
            this.watchComponent(['JobCategory', 'Test']);
            this.registerEvent();
        },

        shouldUpdate : function() {

        },

        registerEvent : function() {
            $('#career').on('click', 'input[type=checkbox]', function(e) {
                var career = []
                $(e.delegateTarget).find(':checkbox:checked').each(function() {
                    career.push(this.value);
                });
                this.setState(career);
                this.shoot('test');
            }.bind(this));
        },

        render : function () {
            console.log('career render()');
            var state = this.store.getState();
            $('#career').find(':checkbox').each(function() {
                if ( state.career.indexOf(this.value) > -1 ) {
                    this.checked = true;
                }
            });

        }
    });
});
