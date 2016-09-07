define(['require'], function (require) {
    function DataSet(data) {
        this.data = {
            "jobCategory" : {//storeKey
                "123": {//code
                    "name": "영업·고객상담",
                    "keyword": {
                        "12" : "기업 영업",
                        "2343" : "기술 영업 화이팅"
                    }
                },
                "456": {//code
                    "name": "SI 업체",
                    "keyword": {
                        "654" : "FE개발자",
                        "04563" : "풀스택노가다"
                    }
                }
            },
            "career" : [1,3],
        };
        data && this.setData(data);

        this.historySize = 10;
        this.history = [];
    };

    DataSet.prototype.setData = function (data, key) {
        if ( !!key ) {
            this.data[key] = data;
        } else {
            this.data = data;
        }
        this.writeHistory(Object.assign({}, this.data));
    };

    DataSet.prototype.getData = function (key) {
        if ( !!key ) {
            return this.data[key];
        } else {
            return this.data;
        }
    };

    /**
     * 데이터가 변경된 히스토리를 보관한다.
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    DataSet.prototype.writeHistory = function(data) {
        var history = this.history.slice(-(this.historySize-1));
        history.push(data);
        this.history = history;
    }

    DataSet.prototype.stringify = function () {
        return JSON.stringify(this.data);
    };

    return DataSet;
});
