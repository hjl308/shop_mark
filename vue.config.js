module.exports = {
  // 关闭esLint语法检查
  lintOnSave:false,
  // 代理跨域（浏览器之间有跨域问题，服务器之间没得）
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        ws: true,
        changeOrigin: true
      }
    }
  },
  /* 
    map文件解释：
      因为打包后的js文件时压缩加密的,有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错
    作用：打包的时候，js文件夹中去除map后缀类型文件,控制台sources里就不会有了，可以让你更好的保护自己的代码
  */
    productionSourceMap:false,
}
