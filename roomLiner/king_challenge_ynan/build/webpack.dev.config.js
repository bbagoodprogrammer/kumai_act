const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const fileLoaderContext = 'src';

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: './src/main.js',
    },
    output: {
        path: resolve('../button'),
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
                target: 'http://activity.17sing.tw',
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
                        cacheDirectory: true
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
                        //data: fs.readFileSync('./src/css/var.scss', 'utf8')
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
            template: 'src/html/index.html',
            chunks: ['vendor', 'app'],
        }),
        
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new CopyWebpackPlugin([
        //     {from: 'src/img/banks', to: 'img/banks'},
        // ]),
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