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

            const html = fs.readFileSync('./dist/index.php');
            fs.writeFileSync('./dist/index.php', html.toString().replace('$hash$', JSON.stringify(obj)));
        });
    }
}

module.exports = LocalFilesHashPlugin;