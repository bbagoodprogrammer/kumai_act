import store from '../store'

const testData = {
    getInitInfo: {
        mobile: '+86-159892229xx', //已绑定的手机号
        card: '', //身份证图片文件地址
        contact: 'vip@kumai-inc.com', //申请失败客服邮箱
        status: 1, //0未申请 1申请通过 2提交审核中 3失败可重新申请 4直接拒绝
        reason: '', //申请失败原因信息
    },

    getUserData: {
        stime: 1582992000, //数据统计开始时间戳
        etime: 1585670399, //数据统计结束时间戳
        days: 6, //还有多少天进入下一个统计周期
        done: 1, //数据是否达标（白名单用户可以直接让这个值为真）
        task: {
            earn: {
                name: '歡鑽收入',
                current: 3,
                target: 3,
            },
        },
    },

    // 申请签约 参数image
    apply: {

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