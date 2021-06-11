const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

let iosReadyTimers = {};
let iosClientReady = false;
window.onClientReady = () => {
    iosClientReady = true;
};

window.signCallbacks = {};
window.finishSign = signStr => {
    const signObj = JSON.parse(signStr);
    const callbackId = signObj.callbackId;
    if (window.signCallbacks && typeof window.signCallbacks[callbackId] == 'function') {
        window.signCallbacks[callbackId](signObj.data, signStr);
    }
};

// 非APP环境会自动返回空的签名信息，防止调用无限等待
export default function getSign(data, callbackId = '') {
    return new Promise((resolve, reject) => {
        const timestamp = Math.round(Date.now() / 1000);
        if (typeof data != 'object' || !callbackId || typeof callbackId != 'string') {
            resolve({sign:'', timestamp});
        }
        
        const dataStr = JSON.stringify({callbackId, data});

        if (ios) {
            window.signCallbacks[callbackId] = res => {
                resolve(res);
            };
            // if (!window.getSign) { // 由于iosClientReady之前无法访问到getSign，因此无法这样判断网页是在iOS APP内的WebView渲染
            if (!/bundleId/.test(navigator.userAgent)) { // APP UA: IOS,version=2.10.145(145),system=13.5.1,app=act,bundleId=com.km.ym,model=iPhone 7 Plus
                finishSign(JSON.stringify({
                    callbackId,
                    data: {
                        sign: '',
                        timestamp
                    }
                }));
                return;
            }
            try {
                if (iosClientReady) {
                    window.getSign(dataStr);
                } else {
                    clearInterval(iosReadyTimers[callbackId]);
                    iosReadyTimers[callbackId] = setInterval(() => {
                        if (iosClientReady) {
                            clearInterval(iosReadyTimers[callbackId]);
                            window.getSign(dataStr);
                        }
                    }, 100);
                }
                // setTimeout(() => {
                //     finishSign(JSON.stringify({
                //         callbackId,
                //         data: {
                //             sign: '',
                //             timestamp
                //         }
                //     }));
                // }, 1000);
            } catch(e) {
                // reject(e);
                finishSign(JSON.stringify({
                    callbackId,
                    data: {
                        sign: '',
                        timestamp
                    }
                }));
            }
        } else {
            try {
                const signStr = window.JSInterface.getSign(dataStr);
                resolve(JSON.parse(signStr));
            } catch(e) {
                // reject(e);
                resolve({
                    sign: '',
                    timestamp
                });
            }
        }
    });
}