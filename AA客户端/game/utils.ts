function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
    });
}

function loadImages(...imgsSrc) {
    const list = [];
    imgsSrc.forEach(src => {
        list.push(loadImage(src));
    });
    return Promise.all(list);
}

export {
    loadImage,
    loadImages,
}