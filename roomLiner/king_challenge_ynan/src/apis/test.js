import store from '../store'

const testData = {
    init: {
        "rank_key": "first_stage_rank",
        "follow": {
            "rank": 1,
            "uid": 1,
            "avatar": "",
            "score": 1,
            "is_register": 0,
            "sex": 1
        },
        "owner": {
            "rank": 2,
            "uid": 2,
            "avatar": "",
            "score": 2,
            "is_register": 1,
            "sex": 1
        }
    },
    init1: {
        "rank_key": "third_stage_rank",
        "follow": {
            "is_register": 1,
            "uid1": {
                "rank": 1,
                "uid": 1,
                "avatar": "",
                "score": 1,
                "sex": 0
            },
            "uid2": {
                "rank": 2,
                "uid": 2,
                "avatar": "",
                "score": 2,
                "sex": 0
            }
        },
        "owner": {
            "is_register": 1,
            "uid1": {
                "rank": 3,
                "uid": 3,
                "avatar": "",
                "score": 3,
                "sex": 0
            },
            "uid2": {
                "rank": 4,
                "uid": 4,
                "avatar": "",
                "score": 4,
                "sex": 0
            }
        }
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