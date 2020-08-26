
const path = require('path')

module.exports = {
  defaultFileConfig: {
    css: false,
    router: false,
    store: false,
    axios: true,
    html: true,
    js: true,
    vue: true
  },

  getCreateConfig: function (dir) {
    const name = '/${filename}/${filename}'
    return {
      css: {
        template: path.join(__dirname, `./template/${dir}/scss.template`),
        // filename用相对路径可以减少检查文件存在的次数
        filename: path.join(__dirname, `../src/${'/${filename}/scss/${filename}.scss'}`)
      },
      html: {
        template: path.join(__dirname, `./template/${dir}/html.template`),
        filename: path.join(__dirname, `../src/${name}.html`)
      },
      js: {
        template: path.join(__dirname, `./template/${dir}/js.template`),
        filename: path.join(__dirname, `../src/${name}.js`)
      },
      store: {
        template: path.join(__dirname, `./template/${dir}/store.template`),
        filename: path.join(__dirname, `../src/${'/${filename}/store'}.js`)
      },
      vue: {
        template: path.join(__dirname, `./template/${dir}/vue.template`),
        filename: path.join(__dirname, `../src/${name}.vue`)
      },
      router: {
        template: path.join(__dirname, `./template/${dir}/router.template`),
        filename: path.join(__dirname, `../src/${'/${filename}/router'}.js`)
      }
    }
  }
}
