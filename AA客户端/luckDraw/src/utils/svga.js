// https://github.com/svga/SVGAPlayer-Web-Lite/blob/master/README.zh-CN.md

import { Downloader, Parser, Player } from 'svga.lite';

// const downloader = new Downloader();
// const parser = new Parser({ disableWorker: !('Worker' in window) });

function loadSvgaData(file) {
    return new Promise((resolve, reject) => {
        ;(async () => {
            try {
                const downloader = new Downloader();
                const parser = new Parser({ disableWorker: !('Worker' in window) });
                const fileData = await downloader.get(file);
                const data = await parser.do(fileData);
                resolve(data);
            } catch(e) {
                reject(e);
            }
        })()
    });
}

function replaceSvgaImage(svgaData, key, url) {
    const image = new Image();
    image.src = url;
    svgaData.images[key] = image;
    return svgaData;
}

async function playSvga(data, setting, canvasSelector = '#canvas') {
    const player = new Player(canvasSelector);
    setting && player.set(setting);
    // player.set({ startFrame:1 }); // 修复静态SVGA问题
    await player.mount(data);
    player.start();
    return player;
}

// 缓存player和svgaData，重复替换图片播放
async function replaceAndPlaySvga(player, svgaData, key, url) {
    player.clear();
    await player.mount(replaceSvgaImage(svgaData, key, url));
    player.start();
    return player;
}

export {
    loadSvgaData,
    replaceSvgaImage,
    playSvga,
    replaceAndPlaySvga,
}