module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 这里的选项会传递给 less-loader
        javascriptEnabled: true,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-mall-admin/' : '/',
};
