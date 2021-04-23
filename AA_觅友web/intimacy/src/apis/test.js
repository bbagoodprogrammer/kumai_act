import store from '../store'

const testData = {
    init: {
        "coins": 1130,
        "rank": [
            {
                "uid": 10013061,
                "rank": 1,
                "score": 1000,
                "avatar": "http://udatefile.cat1314.com/uc/img/head_10013061_1592876180.png?wsSecret=6e180b8d0914b8d983c07d43f61b0009&wsTime=1595433600",
                "nick": "可爱的你哈哈哈哈哈哈11"
            },
            {
                "uid": 10013062,
                "rank": 2,
                "score": 2000,
                "avatar": "http://udatefile.cat1314.com/uc/img/head_10013061_1592876180.png?wsSecret=6e180b8d0914b8d983c07d43f61b0009&wsTime=1595433600",
                "nick": "可爱的你哈哈哈哈哈哈22"
            }
        ],
        "record": [
            {
                "uid": 10013352,
                "coins": 100,
                "nick": "1帅呆✪ω✪"
            },
            {
                "uid": 10013061,
                "coins": 900,
                "nick": "2可爱的你"
            },
            {
                "uid": 10013353,
                "coins": 600,
                "nick": "3帅呆✪ω✪"
            }
        ],
        "owner_coins": 0
    },
};

function testGet(key, onUploadProgress, showLoading = true) {
    showLoading && store.commit('updateLoading', true);

    const hasProgFunc = typeof onUploadProgress == 'function';
    if (hasProgFunc) {
        onUploadProgress({lengthComputable:true, total:100, loaded:0});
        setTimeout(() => onUploadProgress({lengthComputable:true, total:100, loaded:50}), 250);
    }
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            showLoading && store.commit('updateLoading', false);

            hasProgFunc && onUploadProgress({lengthComputable:true, total:100, loaded:100});

            resolve({
                data: {
                    response_status: {code:0, error:''},
                    response_data: testData[key]
                }
            });
        }, 500);
    });
}

export {
    testData,
    testGet
}