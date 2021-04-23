function getUrlString(key) {
    const vars = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, k, v) => {
        vars[k] = v;
    });
    if (key && typeof vars[key] != 'undefined') {
        return decodeURIComponent(vars[key]);
    }
    return null;
}

function getPlatform() {
    let name = 'pc';
    if (navigator.userAgent.match(/iPhone|iPod|ios|iPad/i)) {
        name = 'ios';
    } else if (navigator.userAgent.match(/Android/i)) {
        name = 'android';
    }
    return name;
}

function loadImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = img.onerror = resolve;
        img.src = image;
    });
}
function loadImages(...images) {
    const list = [];
    for(let i = 0; i < images.length; i++) {
        list.push(loadImage(images[i]));
    }
    return Promise.all(list);
}

function htmlEncode(html) {
    return (html + '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function toast(message, time = 1000) {
    const cssTime = 1000;
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed; z-index:10000; left:0; top:0; right:0; bottom:0; text-align:center; pointer-events:none';
    div.innerHTML = '<span style="display:inline-block; padding:.1rem .2rem; max-width:80%; background:#212125; color:#fff; border-radius:.1rem; opacity:0; margin-top:' + Math.round(window.innerHeight / 2) + 'px; transition:opacity ' + (cssTime / 1000) + 's">' + htmlEncode(message) + '</span>';
    document.body.appendChild(div);
    const span = div.firstChild;
    setTimeout(() => {
        span.style.opacity = 1;
    }, 0);
    setTimeout(() => {
        span.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(div);
        }, cssTime);
    }, cssTime + time);
}

function callApp(link, urlModel = false) {
    if (link) {
        if (urlModel) {
            location.href = link;
        } else {
            try {
                if (getPlatform() == 'ios') {
                    sendJsData(link);
                } else {
                    JSInterface.sendJsData(link);
                }
            } catch(e) {}
        }
    }
}

function profile(uid) {
    callApp('app://userInfo?uid=' + uid);
}

export {
    getUrlString,
    getPlatform,
    loadImages,
    toast,
    callApp,
    profile,
}