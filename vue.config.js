/*
 * @Description: file information
 * @Author: will
 * @Date: 2020-05-10 21:13:09
 * @LastEditors: Alex
 * @LastEditTime: 2020-07-14 17:31:34
 */
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const Timestamp = new Date().getTime();
module.exports = {
  publicPath: '/', //根路径
  outputDir: 'dist', //构建输出目录
  assetsDir: 'static', //静态资源路径（js，css，img）
  lintOnSave: true, //是否开启eslint保存检测
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true, // 设置上线后是否加载webpack文件
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    disableHostCheck: true
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '亚联财',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  css: {
    extract: {
      filename: `static/css/[name].${Timestamp}.css`,
      chunkFilename: `static/css/[name].${Timestamp}.css`
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
        'console.log'
      ];
    }
    config.output.filename = `static/js/[name].${Timestamp}.js`;
    config.output.chunkFilename = `static/js/[name].${Timestamp}.js`;
    config.plugins.push(
      // 开启gzip压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    );
  }
};
