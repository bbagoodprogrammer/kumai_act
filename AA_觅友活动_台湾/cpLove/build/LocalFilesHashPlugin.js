const fs = require('fs');

// https://github.com/xsbear/hash-assets-webpack-plugin/blob/master/index.js
class LocalFilesHashPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap('LocalFilesHashPlugin', compilation => {
            const obj = {};
            const files = [];

            const assets = compilation.assets;
            for(let file in assets) {
                if (!/runtime|local|app/.test(file)) {
                    const path = file.split('/');
                    const name = path[path.length - 1];
                    const arr = name.replace('.', '').split('?');
                    if (arr.length == 2) {
                        obj[arr[0]] = arr[1];
                    }
                }
                if (/\.(js|html|php)/.test(file)) {
                    const source = assets[file].source();
                    if (/[\u4e00-\u9fff]/.test(source)) {
                        files.push(file);
                    }
                }
            }

            const html = fs.readFileSync('./dist/index.html');
            fs.writeFileSync('./dist/index.html', html.toString().replace('$hash$', JSON.stringify(obj)));

            const share = fs.readFileSync('./dist/share.html');
            fs.writeFileSync('./dist/share.html', share.toString().replace('$hash$', JSON.stringify(obj)));

            if (files.length) {
                console.log('\n==================== 以下文件包含中文 ====================');
                files.map(file => {
                    console.log(file);
                });
                console.log('==========================================================');
            }
        });
    }
}

module.exports = LocalFilesHashPlugin;