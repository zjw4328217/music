module.exports={
    publicPath:"",
    lintOnSave:false,
     devServer: {
          proxy: {
            '/api': {
              target: 'http://dengheng.top:2222',
              ws: true,
              changeOrigin: true
            }
          }
        }
}