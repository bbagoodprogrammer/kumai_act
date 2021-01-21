const isIOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

window.bindCallbacks = {};
window.onUploadPhoto = jsonStr => {
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
    callback: 'bind_callback',
    lwRatio: 1,
};

function getUploadImg(data = {}) {

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
                window.Native.JSCall('uploadPhoto', data, (res) => {
                    resolve(JSON.parse(res));
                })
            } else {
                console.log(dataStr)
                window.JSInterface.uploadPhoto(dataStr);
            }
        } catch (e) {
            resolve(emptyResult);
        }
    });
}

export {
    bindStatus,
    getUploadImg,
}