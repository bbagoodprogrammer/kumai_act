const os = require('os');
const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const fileLoaderContext = 'src';

function resolve(dir) {
    return path.join(__dirname, dir);
}

const { LANG, APP, AREA, NODE_ENV } = process.env;
const prod = NODE_ENV == 'production';

const files = {};
const langs = LANG.split(',');
for(let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    files[lang] = './src/local/' + lang;
}

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        local: './src/local.js',
        app: './src/main.js',
        share: './src/pages/share/index.js',
        ...files,
    },
    output: {
        path: resolve('../dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': resolve('src')
        }
    },
    devServer: {
        hot: true,
        clientLogLevel: 'error',
        host: '0.0.0.0',
        //disableHostCheck: true,
        proxy: {
            '/': {
                target: 'http://activities.udateapp.com',
                // target: 'http://activity.17sing.tw',
                changeOrigin: true
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(html|php)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: os.tmpdir()
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            outputStyle: 'compressed',
                            includePaths: [
                                resolve('../src/css'),
                            ],
                            data: `$app:${APP}; $area:${AREA}; @import "var";`
                        }
                    }
                ]
            },
            {
                test:  /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5120,
                            context: fileLoaderContext,
                            name: '[path][name].[ext]'
                        }
                    },
                ]
            },
            {
                test:   /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5120,
                        name: 'media/[name].[ext]'
                    }
                }
            },
            {
                test:  /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5120,
                        name: 'fonts/[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            filename: 'index.html',
            template: 'src/html/index.ejs',
            chunks: ['vendor', 'local', 'app'],
            templateParameters: {
                app: APP,
                area: AREA,
                prod,
            },
        }),

        new HtmlPlugin({
            filename: 'share.html',
            template: 'src/html/index.ejs',
            chunks: ['vendor', 'local', 'share'],
            templateParameters: {
                app: APP,
                area: AREA,
                prod,
            },
        }),
        
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new CopyWebpackPlugin([
        //     {from: 'src/static', to: 'static'},
        // ]),
        new webpack.DefinePlugin({
            LANGS: JSON.stringify(langs),
            APP: JSON.stringify(APP),
            AREA: JSON.stringify(AREA),
            PROD: JSON.stringify(prod),
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                },
            }
        }
    }
};