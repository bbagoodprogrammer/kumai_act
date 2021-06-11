const isIOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

window.uploadCallbacks = {};
window.onUploadPhoto = jsonStr => {
    const res = JSON.parse(jsonStr);
    const callback = res.callback;
    if (window.uploadCallbacks && typeof window.uploadCallbacks[callback] == 'function') {
        window.uploadCallbacks[callback](res);
    }
};

const uploadStatus = {
    SUCCESS: 0,
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
    maxWidth: 1000,
    minWidth: 100,
    crop: 1,
};

function uploadPhoto(data = {}) {
    return new Promise((resolve, reject) => {
        if (typeof data != 'object' || data === null) {
            resolve(emptyResult);
        }
        data = Object.assign({}, defaultParams, data);
        try {
            const dataStr = JSON.stringify(data);
            if (isIOS) {
                window.Native.JSCall('uploadPhoto', data, res => {
                    resolve(JSON.parse(res));
                });
            } else {
                window.uploadCallbacks[data.callback] = res => {
                    resolve(res);
                };
                window.JSInterface.uploadPhoto(dataStr);
            }
        } catch(e) {
            resolve(emptyResult);
        }
    });
}

function uploadPhotoByRatio(lwRatio = 1) {
    return uploadPhoto({lwRatio});
}

function uploadPhotoNotCrop() {
    return uploadPhoto({crop:0});
}

export {
    uploadStatus,
    uploadPhoto,
    uploadPhotoByRatio,
    uploadPhotoNotCrop,
}