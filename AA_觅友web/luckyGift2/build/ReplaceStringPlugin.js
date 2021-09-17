const Buffer = require('buffer').Buffer;

const hosts = [
    'localhost:8080',
    '127.0.0.1:8080',
    '127.0.0.1:5500',
    '17sing.tw',
    'singnowapp.com',
    'wekarapp.com',
    'supervoice-app.com',
    'singstarapp.com',
    'udateapp.com',
    'alochatapp.com',
    'newstarapp.com',
];

const pluginName = 'ReplaceStringPlugin';
class ReplaceStringPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.optimizeChunkAssets.tapAsync(pluginName, (chunks, callback) => {
                chunks.map(chunk => {
                    chunk.files.map(file => {
                        if (/local\.js/.test(file)) {
                            let source = compilation.assets[file].source();
                            hosts.forEach(host => {
                                source = source.replace(host, Buffer.from(host).toString('base64'));
                            });
                            compilation.assets[file].source = () => source;
                        }
                    });
                });
                callback();
            });
        });
    }
}
module.exports = ReplaceStringPlugin;