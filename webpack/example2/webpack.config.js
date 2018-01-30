const path = require('path'); //此处引用的是node的内置模块

module.exports = {
  entry:path.join(__dirname,'./src/index.js'),   //entry配置入口模块
  output:{  //输出配置信息
    path:path.join(__dirname,'./dist'),   //打包好的文件所存入的路径
    filename:'bundle.js'  //打包成功后的文件名字
  }
}