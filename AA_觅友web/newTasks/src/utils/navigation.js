var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

function getStatusBarHeight() {
    // var height = 0;
    // try {
    //   if (ios) {
    //     height = prompt(JSON.stringify({ method: 'getStatusBarHeight' }));
    //   } else {
    //     height = window.JSInterface.getStatusBarHeight();
    //   }
    // } catch (error) {

    // }
    // let method = 'getStatusBarHeight'
    // let dataValue
    // return JSInterface[method]()
    return callAppNew("getStatusBarHeight", undefined, true) || 0;
}

function setStatusBarStyle(skin) {
    skin = skin === "black" ? skin : "light";
    var args = JSON.stringify({ skin: skin });
    callAppNew("setStatusBarStyle", args);
    // try {
    //   if (ios) {
    //     window.setStatusBarStyle(args);
    //   } else {
    //     window.JSInterface.setStatusBarStyle(args);
    //   }
    // } catch (error) {

    // }
}

function setFullScreen(full) {
    full = full !== false;
    callAppNew("setFullScreen", full);
    // try {
    //   if (ios) {
    //     window.setFullScreen(full);
    //   } else {
    //     window.JSInterface.setFullScreen(full);
    //   }
    // } catch (error) {

    // }
}

function callAppNew(method, data, sync = false) {
    if (method && typeof method == "string") {
        const dataValue =
            typeof data == "string" ||
            typeof data == "boolean" ||
            typeof data == "number" ||
            data === null
                ? data
                : JSON.stringify(data);
        const hasArgs = typeof dataValue != "undefined" && data != null;
        try {
            if (ios) {
                if (sync) {
                    console.log(method);
                    return prompt(JSON.stringify({ method, data }));
                } else {
                    hasArgs ? window[method](dataValue) : window[method]();
                }
            } else {
                return hasArgs
                    ? JSInterface[method](dataValue)
                    : JSInterface[method]();
            }
        } catch (e) {}
    }
}

export { setFullScreen, setStatusBarStyle, getStatusBarHeight, callAppNew };
