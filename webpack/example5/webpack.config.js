const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:path.join(__dirname,'./src/index.js'),
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.join(__dirname,'./src/index.html'),
      filename:'index.html'
    })
  ],
  module:{
    rules:[
      //注意，此处一定要把node_modules添加到exclude排除项，否则node_modules中的东西也将被打包，最终导致错误
      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
    ]
  }
}
