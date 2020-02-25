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

function getRand(start, end) {
    const len = end - start;
    return start + Math.round(Math.random() * len);
}

function arrayRandom(arr) {
    return arr.sort(() => {
        return 0.5 - Math.random();
    });
}

function getOffset(elem) {
    let offsetLeft = elem.offsetLeft;
    let offsetTop = elem.offsetTop;
    let offsetParent = elem.offsetParent;
    while(offsetParent) {
        offsetLeft += offsetParent.offsetLeft;
        offsetTop += offsetParent.offsetTop;
        offsetParent = offsetParent.offsetParent;
    }
    return {
        left: offsetLeft,
        top: offsetTop
    };
}

function toast(message, time = 1000) {
    const cssTime = 1000;
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed; z-index:10000; left:0; top:0; right:0; bottom:0; text-align:center; pointer-events:none';
    div.innerHTML = '<span style="display:inline-block; padding:.1rem .2rem; max-width:80%; background:#2e3846; color:#fff; border-radius:.1rem; opacity:0; margin-top:' + Math.round(window.innerHeight / 2) + 'px; transition:opacity ' + (cssTime / 1000) + 's">' + message + '</span>';
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

const isSupportedTouch = (function() {
    let supported = false;
    try {
        document.createEvent('TouchEvent');
        supported = true;
    } catch(e) {}
    return supported;
})();

const isSupportedCss3D = (function() {
    let supported = false;
    const el = document.createElement('div');
    el.style.transform = 'translate3d(1px,1px,1px)';
    document.body.appendChild(el);
    const value = window.getComputedStyle(el).getPropertyValue('transform');
    document.body.removeChild(el);
    supported = value !== undefined && value.length > 0 && value !== 'none';
    return supported;
})();

export {
    getUrlString,
    getRand,
    arrayRandom,
    getOffset,
    toast,
    isSupportedTouch,
    isSupportedCss3D,
}
