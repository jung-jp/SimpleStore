// var dataSet = {
//     data : {
//         "job_category" : {//storeKey
//             "123": {//code
//                 "name": "영업·고객상담",
//                 "keyword": {
//                     "12" : "기업 영업",
//                     "2343" : "기술 영업 화이팅"
//                 }
//             },
//             "456": {//code
//                 "name": "SI 업체",
//                 "keyword": {
//                     "654" : "FE개발자",
//                     "04563" : "풀스택노가다"
//                 }
//             }
//         },
//         category_2 : {},
//         category_3 : {},
//         category_4 : {},
//         category_5 : {}
//     },
//
//     setData : function(data, category) {
//         if ( !!category ) {
//             this.data[category] = data;
//         } else {
//             this.data = data;
//         }
//     },
//
//     getData : function(category) {
//         if ( !!category ) {
//             return this.data[category];
//         } else {
//             return data;
//         }
//     },
//
//     dataStringify : function() {
//         return JSON.stringify(this.data);
//     }
//
// };

define({
    data : {
        "job_category" : {//storeKey
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
        category_2 : {},
        category_3 : {},
        category_4 : {},
        category_5 : {}
    },

    setData : function(data, category) {
        if ( !!category ) {
            this.data[category] = data;
        } else {
            this.data = data;
        }
    },

    getData : function(category) {
        if ( !!category ) {
            return this.data[category];
        } else {
            return data;
        }
    },

    dataStringify : function() {
        return JSON.stringify(this.data);
    }

});
