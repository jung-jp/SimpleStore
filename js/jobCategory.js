define([
  'require', 'jquery',  'modernizr',  'Store', 'DataSet',
], function (require) {

    function JobCategory(store) {
        this.store = store || require('Store');;
    }

    JobCategory.prototype.init = function () {
        console.log('JobCategory init()');
    };

    JobCategory.prototype.render = function () {

        console.log('JobCategory render()');

        // 이전 값을 가지고 있다가 비교해서 바뀟부분만 처리 ??
        // beforData = Object.assingn({}, data);
        //
    };

    return JobCategory;
});
