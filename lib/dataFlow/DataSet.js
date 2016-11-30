
define([], function () {
    /**
     * 데이터를 저장하기 위한 객체
     * @constructor
     * @alias module:DataSet
     * @param {object} data - 데이터 객체
     */
    function DataSet(data) {
        this.data = {};
        this.historySize = 10;
        this.history = [];
        data && this.setData(data);
    }

    /**
     * 데이터를 셋 한다.
     * @param {object} data
     * @param {string} key
     */
    DataSet.prototype.setData = function (data, key) {
        if (!data) {
            return;
        }
        if (!!key) {
            if (Object.prototype.toString.call(key) === '[object Array]]' && key.length > 0 ) {
                this.data[key[0]] = data;
            } else {
                this.data[key] = data;
            }

        } else {
            this.data = data;
        }
        this.writeHistory(Object.assign({}, this.data));
    };

    /**
     * 데이터를 리턴 한다.
     * @param  {string} key - 데이터 키
     * @return {*|{}} data - 데이터 객체
     */
    DataSet.prototype.getData = function (key) {
        if (!!key) {
            return this.data[key] || {};
        } else {
            return this.data || {};
        }
    };

    /**
     * 데이터가 변경된 히스토리를 보관한다.
     * @param  {object} data - 데이터 객체
     */

    DataSet.prototype.writeHistory = function (data) {
        var history = this.history.slice(-(this.historySize - 1));
        history.push(data);
        this.history = history;
    };

    /**
     * JSON 형태의 문자열을 반환한다.
     * @return {object} - 데이터 객체
     */
    DataSet.prototype.stringify = function () {
        return JSON.stringify(this.data);
    };
    return DataSet;
});
