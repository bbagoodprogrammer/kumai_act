function getOffset(elem) {
    let offsetLeft = elem.offsetLeft;
    let offsetTop = elem.offsetTop;
    let offsetParent = elem.offsetParent;
    while (offsetParent) {
        offsetLeft += offsetParent.offsetLeft;
        offsetTop += offsetParent.offsetTop;
        offsetParent = offsetParent.offsetParent;
    }
    return {
        left: offsetLeft,
        top: offsetTop
    };
}
export { getOffset } 