module.exports = {
  // configureWebpack: config => {
  //   config.module.rules.push({
  //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  //     use: [{
  //       loader: 'image-webpack-loader',
  //       options: { bypassOnDebug: true }
  //     }]
  //   })
  // },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename('js/[name].js?[contenthash:8]').end();
      config.output.chunkFilename('js/[name].js?[contenthash:8]').end();
      // 修改生产配置
      config.plugin('extract-css').tap(args => [{
        filename: `css/[name].css?[contenthash:8]`,
        chunkFilename: `css/[name].css?[contenthash:8]`
      }])
    }
  },
  productionSourceMap: false,
  publicPath: "./",
  devServer: {
    proxy: {
      "/": {
        target: "http://activity.udateapp.com",
        changeOrigin: true
      }
    }
  }
}
