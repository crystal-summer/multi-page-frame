'use strict'

const path = require('path')

const pageConfig = {
  gov: {
    pages: {
      gov: {
        // page 的入口，相当于单页面应用的 main.js ， 必需
        entry: path.join(__dirname, './src/gov/main.js'),
        // 模板来源，相当于单页面应用的 public/index.html，非必需，省略时默认与模块名一致
        template: path.join(__dirname, 'public/govIndex.html'),
        // 编译后 dist 目录中输出的文件名，非必需，省略时默认与模块名一致（在 dist/index.html 的输出）
        filename: 'govIndex.html',
        // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'gov Page',
        favicon: path.join(__dirname, './public/favicon.ico'),
        // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', 'gov']
      }
    }
  },
  ent: {
    pages: {
      ent: {
        // page 的入口，相当于单页面应用的 main.js ， 必需
        entry: path.join(__dirname, './src/ent/main.js'),
        // 模板来源，相当于单页面应用的 public/index.html，非必需，省略时默认与模块名一致
        template: path.join(__dirname, 'public/entIndex.html'),
        // 编译后 dist 目录中输出的文件名，非必需，省略时默认与模块名一致（在 dist/index.html 的输出）
        filename: 'entIndex.html',
        // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'ent Page',
        favicon: path.join(__dirname, './public/favicon.ico'),
        // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', 'ent']
      }
    }
  }
}

module.exports = pageConfig
