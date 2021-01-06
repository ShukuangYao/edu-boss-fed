module.exports = {
  css: {
    loaderOptions: {
      // 每个vue文件下都会注入该文件，这样的话不用每个文件都单独写@import "~@/styles/variables.scss";来引入样式常量
      scss: {
        prependData: '@import "~@/styles/variables.scss";',
      },
    },
  },
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true, // 把请求头中的host配置成target
      },
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true, // 把请求头中的host配置成target
      },
    },
  },
};
