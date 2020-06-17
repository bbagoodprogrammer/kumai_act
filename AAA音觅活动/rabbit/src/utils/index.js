function getUrlString(key) {
    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
    const r = window.location.search.substr(1).match(reg);
    if(r != null){
        return r[2];
    }
    return null;
}

function preloadImages(...images) {
    images.forEach(url => {
        const img = new Image();
        img.src = url;
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

const isSupportedTouch = (function() {
    let supported = false;
    try {
        document.createEvent('TouchEvent');
        supported = true;
    } catch(e) {}
    return supported;
})();

export {
    getUrlString,
    preloadImages,
    getOffset,
    isSupportedTouch,
}
