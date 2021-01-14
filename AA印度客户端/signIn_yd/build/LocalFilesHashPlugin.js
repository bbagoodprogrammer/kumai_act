const fs = require('fs');

// https://github.com/xsbear/hash-assets-webpack-plugin/blob/master/index.js
class LocalFilesHashPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap('LocalFilesHashPlugin', compilation => {
            const stats = compilation.getStats().toJson({
                hash: false,
                publicPath: false,
                assets: false,
                chunks: true,
                modules: false,
                source: false,
                errorDetails: false,
                timings: false
            });

            const obj = {};
            stats.chunks.forEach(chunk => {
                chunk.files.forEach(file => {
                    if (!/runtime|local|app/.test(file)) {
                        const path = file.split('/');
                        const name = path[path.length - 1];
                        const arr = name.replace('.', '').split('?');
                        obj[arr[0]] = arr[1];
                    }
                });
            });

            const html = fs.readFileSync('./dist/index.html');
            const html2 = fs.readFileSync('./dist/index2.html');
            const html3 = fs.readFileSync('./dist/index3.html');
            fs.writeFileSync('./dist/index.html', html.toString().replace('$hash$', JSON.stringify(obj)));
            fs.writeFileSync('./dist/index2.html', html.toString().replace('$hash$', JSON.stringify(obj)));
            fs.writeFileSync('./dist/index3.html', html.toString().replace('$hash$', JSON.stringify(obj)));
        });
    }
}

module.exports = LocalFilesHashPlugin;