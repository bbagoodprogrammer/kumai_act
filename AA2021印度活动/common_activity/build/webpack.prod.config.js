const os = require('os');
const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const LocalFilesHashPlugin = require("./LocalFilesHashPlugin");
const ReplaceStringPlugin = require("./ReplaceStringPlugin");

const fileLoaderContext = 'src';

function resolve(dir) {
    return path.join(__dirname, dir);
}

const files = {};
const langs = process.env.LANG.split(',');
for(let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    files[lang] = './src/local/' + lang;
}

module.exports = {
    entry: {
        local: './src/local.js',
        app: './src/main.js',
        ...files,
    },
    output: {
        path: resolve('../dist'),
        filename: 'js/[name].js?[contenthash:8]',
        chunkFilename: 'js/[name].js?[contenthash:8]'
    },
    externals: {
        'axios': 'axios',
        'es6-promise/auto': 'ES6Promise',
        'regenerator-runtime/runtime': 'regeneratorRuntime',
        'vue': 'Vue',
        'vue-lazyload': 'VueLazyload',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': resolve('src')
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                resolve('../src/css'),
                            ],
                            data: '@import "var";'
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
                            name: 'img/[hash:6].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            optipng: {
                                enabled: false
                            }
                        }
                    }
                ]
            },
            {
                test:   /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5120,
                        name: 'media/[name].[ext]?[hash:6]'
                    }
                }
            },
            {
                test:  /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5120,
                        name: 'fonts/[name].[ext]?[hash:6]'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            filename: 'index.html',
            template: 'src/html/app.html',
            // template: 'src/html/app_share.ejs',
            chunks: ['runtime', 'local', 'app'],
            templateParameters: {
                lang: langs[0],
                app: process.env.APP,
                area: process.env.AREA,
            },
        }),

        // 内联runtime到html主要考虑将来在项目中动态导入文件导致所有页面主脚本文件缓存失效问题
        // 动态导入类似这样：import(/*webpackChunkName:"lazyload"*/'vue-lazyload')
        // 动态导入文件如果已经打包到项目中，再执行一样的文件动态导入打包会出错
        new ScriptExtHtmlWebpackPlugin({
            // inline: ['runtime', 'local', 'config']
            inline: ['runtime', 'local'] // 由于上线后配置也少改，cacheGroups中的config不内联到html，避免一些URL配置直接暴露出来
        }),
        
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?[contenthash:8]',
            chunkFilename: 'css/[id].css?[contenthash:8]'
        }),
        new webpack.BannerPlugin('Created by Guohui\nUser: webflash2007@gmail.com\nVersion: 1.0.0'),
        new CleanWebpackPlugin('dist', {root:resolve('../')}),
        new VueLoaderPlugin(),
        // new CopyWebpackPlugin([
        //    {from: 'src/static', to: 'static'},
        // ]),
        //https://segmentfault.com/a/1190000015919928
        new webpack.NamedChunksPlugin(chunk => {
            if (chunk.name) {
                return chunk.name;
            }
            return Array.from(chunk.modulesIterable, m => m.id).join('_');
        }),
        new LocalFilesHashPlugin(),
        new ReplaceStringPlugin(),
        new webpack.DefinePlugin({
            LANGS: JSON.stringify(langs),
            APP: JSON.stringify(process.env.APP),
            AREA: JSON.stringify(process.env.AREA),
        }),
    ],
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: {
            name: 'runtime'
        },
        minimizer: [
            new TerserPlugin({
                cache: os.tmpdir(),
                terserOptions: {
                    compress: {
                        drop_console: false
                    }
                }
            }),
        ],
        splitChunks: {
            cacheGroups: {
                // vendor: { // 配置externals使用CDN
                //     test: /node_modules/,
                //     name: 'vendor',
                //     chunks: 'initial',
                //     priority: 20,
                //     enforce: true
                // },
                // common: {
                //     minChunks: 3,
                //     name: 'common',
                //     chunks: 'initial',
                //     priority: 10,
                //     enforce: true
                // },
                // config: {
                //     name: 'config',
                //     test: /config[\\/]/,
                //     chunks: 'initial',
                //     priority: 30,
                //     enforce: true
                // },
                // utils: {
                //     name: 'utils',
                //     test: /utils[\\/]index/,
                //     chunks: 'initial',
                //     priority: 30,
                //     enforce: true
                // },
            }
        }
    }
};