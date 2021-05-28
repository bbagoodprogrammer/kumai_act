const isIOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

window.uploadCallbacks = {};
window.onUploadPhoto = jsonStr => {
    const res = JSON.parse(jsonStr);
    const callback = res.callback;
    if (window.uploadCallbacks && typeof window.uploadCallbacks[callback] == 'function') {
        window.uploadCallbacks[callback](res);
    }
};

const emptyResult = {
    callback: '',
    code: 0,
    error: '',
    base64: '',
};

const defaultParams = {
    callback: 'upload_callback',
    lwRatio: 1,
    useCameraOnly: false,
};

function uploadPhoto(data = {}) {
    return new Promise((resolve, reject) => {
        if (typeof data != 'object' || data === null) {
            resolve(emptyResult);
        }
        data = Object.assign({}, defaultParams, data);
        try {
            window.uploadCallbacks[data.callback] = res => {
                resolve(res);
            };
            const dataStr = JSON.stringify(data);
            if (isIOS) {
                window.uploadPhoto(dataStr);
            } else {
                window.JSInterface.uploadPhoto(dataStr);
            }
        } catch(e) {
            resolve(emptyResult);
        }
    });
}

export {
    uploadPhoto,
}