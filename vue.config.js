// vue.config.js
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

const CompressionWebpackPlugin = require("compression-webpack-plugin") // 开启gzip压缩(可选)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i // 开启gzip压缩(可选)

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin // 打包分析，(可选)

// const IS_PRODUCTION = ['production', 'prod'].includes(process.env.NODE_ENV)//判断是否是生产环境
/** 正式配置项，以下参数 都是可选**/
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/hai_wang/'
    : '/',  // 打包公共路径 静态资源的路径 js css
  indexPath: 'index.html', // 相对于打包路径index.html的路径
  outputDir: 'hai_wang', // 'dist', 生产环境构建文件的目录
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码，false不需要
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map,
  // parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  // pwa: {}, // 向 PWA 插件传递选项。
  chainWebpack: config => {
    config.resolve.symlinks(true) // 修复热更新失效
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap(args => {
      // 修复 Lazy loading routes Error 
      args[0].chunksSortMode = "none"
      return args
    })
    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
    // 压缩图片
    // 需要 npm i -D image-webpack-loader
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 }
      })
    // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
    // if (IS_PRODUCTION) {
    //   config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
    //     {
    //       analyzerMode: "static"
    //     }
    //   ])
    // }
  },
  //webpack的配置项
  configureWebpack: {
    // 开启 gzip 压缩
    // 需要 npm i -D compression-webpack-plugin
    plugins: [
      // if (IS_PRODUCTION) {
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: productionGzipExtensions,
        threshold: 10240,// 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      })
    ]
  },
  css: {
    // extract: IS_PRODUCTION,
    requireModuleExtension: true,// 去掉文件名中的 .module
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        // `globalVars` 定义全局对象，可加入全局变量
        globalVars: {
          primary: '#333'
        }
      }
    }
  },
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "0.0.0.0",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //是否自动弹出浏览器页面
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: { //配置多个跨域
      "/hisee": {
        target: "http://10.0.100.59:20010/hisee/",
        changeOrigin: true,
        ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          '^/hisee/': ''
        }
      },
      // "/admin": {
      //   target: "http://10.0.100.59:20010/hisee/",
      //   changeOrigin: true,
      //   //ws: true,//websocket支持
      //   secure: false,
      //   pathRewrite: {
      //     "^/admin": ''
      //   }
      // },
    }
  }
}
