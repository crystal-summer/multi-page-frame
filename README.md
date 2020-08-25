# multi-page-frame

## 多页面配置
多页面项目配置，遵循一个页面一个端原则创建文件夹和文件，创建文件的规则写在配置文件夹config里。

 * 在config/fileName文件 新增一个文件名(相当于新建一个页面文件)
 * 在根目录创建进程文件，规定当前进程对象(eg:.env.gov .env.govDev)
 * 在package.json 文件创建script脚本命令，包括启动命令和打包命令 (eg:"vue-cli-service serve --mode govDev“)
 * 在config/template创建模板文件
 * 运行npm run create 或者node ./index.js，新建的文件夹和文件即生成

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run govDev
npm run entDev
npm run h5Dev
```

### Compiles and minifies for production
```
npm run gov
npm run ent
npm run h5
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
