define([
    'require', 'jquery', 'Component'
], function (require, $, component) {
    'use strict';
    var _self;
    return component.create({

        name : 'Hello',

        init : function () {
            _self = this;
            _self.initState({
                'msg' : 'init hello'
            });
            _self.registerEvent();
        },

        registerEvent : function() {
            $('#hello').on('click', function() {
                _self.setState({
                    'msg' : 'hello!!'
                });
            }
        },

        render: function () {
            var state = _self.getState();
            $('#content').val(state.msg);
        }
    });
});
