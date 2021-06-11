import store from '../store'

const testData = {
    getInitInfo: {
        mobile: '+86-159892229xx', //已绑定的手机号
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
    testGet,
}