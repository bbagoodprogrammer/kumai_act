const isIOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

const status = {
    cancel: -1,
    fail: 0,
    success: 1,
};

const typeNames = {
    0: 'ZALO',
    1: 'App',
    2: 'Line',
    3: 'FaceBook',
    4: 'Messenger',
    5: 'CopyLink',
};

window.finishShare = jsonStr => {
    // status, from, uid, type
    const obj = JSON.parse(jsonStr);
    let { status, from, uid, type } = obj;
    status = parseInt(status);
    uid = parseInt(uid);
    type = parseInt(type);
    if ((status > 0 && typeof window.onShareSuccess == 'function') || (status == 0 && type == 0)) {
        const typeName = typeNames[type] || '';
        window.onShareSuccess(from, uid, type, typeName);
    }
};

export default function share(conf) {
    //url title desc image from
    try {
        if (isIOS) {
            window.share(JSON.stringify(conf));
        } else {
            JSInterface.share(JSON.stringify(conf));
        }
    } catch (e) { }
}