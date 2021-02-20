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
            const html_vi = fs.readFileSync('./dist/index_vi.html');
            const html_ar = fs.readFileSync('./dist/index_ar.html');
            const html_id = fs.readFileSync('./dist/index_id.html');
            fs.writeFileSync('./dist/index.html', html.toString().replace('$hash$', JSON.stringify(obj)));
            fs.writeFileSync('./dist/index_vi.html', html_vi.toString().replace('$hash$', JSON.stringify(obj)));
            fs.writeFileSync('./dist/index_ar.html', html_ar.toString().replace('$hash$', JSON.stringify(obj)));
            fs.writeFileSync('./dist/index_id.html', html_id.toString().replace('$hash$', JSON.stringify(obj)));
        });
    }
}

module.exports = LocalFilesHashPlugin;