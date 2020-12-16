module.exports = {
  //=>process.env.NODE_ENV：环境变量中存储的是开发环境还是生产环境
  publicPath: './',

  assetsDir: 'assets',

  //=>关闭生产环境下的资源映射（生产环境下不在创建xxx.js.map文件）
  productionSourceMap: false,

  filenameHashing: false,

  //=>设置一些webpack配置项，用这些配置项和默认的配置项合并
  configureWebpack: {
    plugins: []
  },

  //=>直接去修改内置的webpack配置项

  //=>修改webpack-dev-server配置（尤其是跨域代理）
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: '8080',
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        changeOrigin: false,
        target: "http://192.168.0.189:3000",
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },

  // transpileDependencies: process.env.NODE_ENV === "development" ? ["*"] : [],
  // transpileDependencies: ['vue', 'vue-router', /node_modules[/\\\\](element-ui|vuex|)[/\\\\]/]
  // transpileDependencies: ["view-design"]
  // transpileDependencies: ["axios","vue-router","babel-plugin-import",'iview', "vue-baidu-map","vue-layer", "view-design", "vue-piczoom", "vuex-persistedstate","core-js","vuex"]
  chainWebpack:  config => {
    // ie报错无效字符 添加该配置项 解决该问题
    config.module
      .rule('iview')
      .test(/iview.src.*?js$/)
      .use('babel')
        .loader('babel-loader')
        .end()   
  }
}