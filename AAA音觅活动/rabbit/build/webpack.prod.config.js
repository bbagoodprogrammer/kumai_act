const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const fileLoaderContext = 'src';

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        path: resolve('../dist'),
        filename: 'js/[name].js?[contenthash:8]',
        chunkFilename: 'js/[name].js?[contenthash:8]'
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
                        cacheDirectory: true
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
                            name: '[path][name].[ext]?[hash:6]'
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
            filename: '../dist/index.html',
            template: 'src/html/index.html',
            chunks: ['runtime', 'vendor', 'app'],
        }),
        
        new ScriptExtHtmlWebpackPlugin({
            inline: ['runtime']
        }),
        
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?[contenthash:8]',
            chunkFilename: 'css/[id].css?[contenthash:8]'
        }),
        new webpack.BannerPlugin('Created by Tang Guohui\nUser: tang_guohui@qq.com'),
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
        })
    ],
    optimization: {
        moduleIds: 'hashed', //https://webpack.js.org/configuration/optimization/#optimization-moduleids
        runtimeChunk: {
            name: 'runtime' //https://webpack.js.org/configuration/optimization/#optimization-runtimechunk
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    priority: 20,
                    enforce: true
                },
            }
        }
    }
};