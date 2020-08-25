'use strict'
const { getCreateConfig } = require('./config/config.file')
const fileName = require('./config/fileName')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

function getPages () {
  const obj = {}
  const { html: { filename: template }, js: { filename: entry } } = getCreateConfig(process.env.selfDirName)
  Object.entries(fileName).forEach(([k, v]) => {
    obj[k] = {
      entry: entry.replace(/\${filename}/g, k),
      template: template.replace(/\${filename}/g, k),
      filename: isProd ? `${k}.html` : `${process.env.selfDirName}/${k}.html`, // process.env.NODE_ENV === 'production' ?`${v}.html`:`${process.env.selfDirName}/${v}.html`,
      title: '',
      favicon: path.join(__dirname, './public/favicon.ico'),
      chunks: ['chunk-vendors', 'chunk-common', `${k}`]
    }
  })
  return obj
}
const pages = getPages()

module.exports = {
  publicPath: isProd ? '' : '/',
  outputDir: 'dist/' + process.env.selfDirName,
  assetsDir: 'static', // 打包后的css、js等静态文件目录名
  lintOnSave: true,
  pages: { [process.env.selfDirName]: pages[process.env.selfDirName] },
  devServer: {
    index: `/${process.env.selfDirName}.html`,
    contentBase: path.join(__dirname, process.env.selfDirName),
    port: process.env.port,
    open: true
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    // proxy: {
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: 'http://10.1.1.139:8444',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: ''
    //     }
    //   }
    // }
  },
  css: {
    sourceMap: !isProd,
    loaderOptions: process.env.selfAdaption ? {
      postcss: {
        plugins: [
          // px转rem
          require('postcss-pxtorem')({
            rootValue: 37.5,
            unitPrecision: 5,
            propList: ['*', '!font-size', '!border'],
            replace: !!isProd,
            selectorBlackList: [],
            minPixelValue: 12
          })
        ]
      }
    } : {}
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: '多页面应用框架',
    resolve: {
      alias: { // 别名
        '@': path.resolve(__dirname, './src'),
        '@utils': path.resolve(__dirname, './src/common/utils'),
        '@constant': path.resolve(__dirname, './src/common/constant'),
        '@api': path.resolve(__dirname, './src/common/api'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@static': path.resolve(__dirname, './static')
      }
    }
  },
  chainWebpack (config) {
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      )

    config
      .plugin('copy')
      .init(
        CopyWebpackPlugin =>
          new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, './static'),
              to: path.resolve(__dirname, './dist/static')
            }
          ])
      )
      .end()
  }
}
