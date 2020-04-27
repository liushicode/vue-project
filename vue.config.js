
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
  // return path.join(__dirname, '..', dir)
}
module.exports = {
  // 配置后就可以正常运行脚手架2的代码，同时vue3的代码也能正常运行
  configureWebpack: {
    resolve: {
      // 可以省略写法
      extensions: ['.js', '.vue', '.json'],
      alias: {
        // import Vue from 'vue/dist/vue.esm.js'
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    },
  },
  // 代理服务器解决跨域问题
  devServer: {
    proxy: {
      '/api': {
        // 目标地址
        target: 'http://localhost:5000',
        // 是否跨域
        changeOrigin: true,
        // 重写路径 '/api'---> ''
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}