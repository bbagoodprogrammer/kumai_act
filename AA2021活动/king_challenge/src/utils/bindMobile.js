const isIOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

window.bindCallbacks = {};
window.onMobiChecker = jsonStr => {
    const res = JSON.parse(jsonStr);
    const callback = res.callback;
    if (window.bindCallbacks && typeof window.bindCallbacks[callback] == 'function') {
        window.bindCallbacks[callback](res);
    }
};

const bindStatus = {
    SUCCESS: 1,
    FAIL: 0,
    CANCEL: -1,
};

const emptyResult = {
    callback: '',
    status: bindStatus.FAIL,
    message: '',
    mobile: '',
    country: '',
    token: '',
};

const defaultParams = {
    from: 'signing',
    callback: 'bind_callback',
    action: 'bind',
    mobile: '',
    country: '',
};

function getBindMobile(data = {}) {
    return new Promise((resolve, reject) => {
        if (typeof data != 'object') {
            resolve(emptyResult);
        }
        
        data = Object.assign(defaultParams, data);

        window.bindCallbacks[data.callback] = res => {
            resolve(res);
        };

        try {
            const dataStr = JSON.stringify(data);
            if (isIOS) {
                window.showMobiChecker(dataStr);
            } else {
                window.JSInterface.showMobiChecker(dataStr);
            }
        } catch(e) {
            resolve(emptyResult);
        }
    });
}

export {
    bindStatus,
    getBindMobile,
}