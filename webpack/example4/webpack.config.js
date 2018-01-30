const path = require('path');

//html-webpack-plugin插件的作用就是将指定的html文件复制一份托管到内存中
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:path.join(__dirname,'./src/index.js'),
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'
  },
  plugins:[ //plugins专门配置webpack相关插件
    new HtmlWebpackPlugin({
      template:path.join(__dirname,'./src/index.html'), //制定要被托管的html文件以及其路径
      filename:'index.html' //指定要生成的页面的名称，也就是被托管到内存中的html文件，默认托管到根目录
    })
  ],
  module:{  //配置第三方loader模块
    rules:[ //第三方文件后缀匹配规则以及loader，注意如果存在多个loader，loader调用顺序是从后向前
      {test:/\.css$/,use:['style-loader','css-loader']},  //配置css文件loader   
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      //因为此处index以及bundle.js都是托管到内存中的，所以css加载图片时需要配置此项，否则npm run dev启动报错
      // {test:/\.jpg|png|gif|bmp$/,use:'url-loader'}  
      //默认情况下使用url-loader将把图片转为base64格式的图片，如果不想改变图片格式，可以下载file-loader，
      //增加limit限制,当limit限制小于图片大小时(右键图片，属性，查看图片大小---注意：图片大小指的是字节数)，
      //图片会以原本格式展现
      // {test:/\.jpg|png|gif|bmp$/,use:'url-loader?limit=5948'}  
      //经过以上两步后，图片正常显示，并且保持了原本格式，但是图片名称被改成了hash值，如果想保持图片原有名称
      //可以增加name限制 ---name=[name].[ext]代表原有的图片名称
      // {test:/\.jpg|png|gif|bmp$/,use:'url-loader?limit=5948&name=[name].[ext]'}
      //同时你也可以以hash值+原本名字配合使用 
      {test:/\.jpg|png|gif|bmp$/,use:'url-loader?limit=5948&name=[hash:8]-[name].[ext]'}
    ]
  }
}