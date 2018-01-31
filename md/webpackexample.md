### 实例一
本例只是webpack基础用法，使用命令转换index.js文件
+ index.js代码展示

```
import $ from 'jquery'
$(function(){
  $('li:even').css('background','red');
  $('li:odd').css('background','yellow');
});
```

以下是操作步骤
+ 执行命令 npm i webpack -g  全局安装，将webpack安装到C:\Users\Administrator\AppData\Roaming\npm
+ 安装jquery ---`npm install jquery`
+ 在index.js使用es6语法引入 `import $ from 'jquery'`
+ 执行webpack ./src/index.js ./dist/bundle.js
+ 执行成功后将在dist目录下生产bundle.js文件，该js文件综合了jquery和index.js

### 实例二
本例是实例一的基础上增加webpack.config.js文件配置，在webpack.config.js文件中配置了入口文件和出口文件，这样就可以只用在命令行输入`webpack`命令，生成对应的文件。

+ webpack.config.js配置

```
const path = require('path'); //此处引用的是node的内置模块

module.exports = {
  entry:path.join(__dirname,'./src/index.js'),   //entry配置入口模块
  output:{  //输出配置信息
    path:path.join(__dirname,'./dist'),   //打包好的文件所存入的路径
    filename:'bundle.js'  //打包成功后的文件名字
  }
}
```

+ index.js文件

```
import $ from 'jquery';

$(function(){
  $('li:even').css('background','red');
  $('li:odd').css('background','yellow');
})
```

### 实例三
实例二中虽然引入了webpack.config.js配置，并且在配置中引入了一个入口和一个出口，webpack可以根据这个进行js的打包和编译工作，但是仅仅这样还远远不够，每次修改相关文件后，我们需要重新执行webpack命令进行编译，因此实例三中引入了webpack-dev-server,它启动了一个使用express的Http服务器，此外这个Http服务器和client使用了websocket通讯协议，原始文件作出改动后，webpack-dev-server会实时的编译

当然值得注意的是，webpack-dev-server实时编译的文件并没有输出到目标文件夹，也就是webpack.config.js的output配置，实际上经过webpack-dev-server实时编译的文件存在了内存中（有关webpack-dev-server详细用法后续再详细记录）

本例中使用了webpack-dev-server工具，并且使用webpack的局部安装(webpack-dev-server工具,需要依赖于项目本地安装webpack，否则会报错)
1. npm i webpack -D   将webpack局部安装，-D代表下载的是是开发依赖，安装后依赖会添加到package.json文件中的devDependencies配置中，
devDependencies代表开发依赖
2. 安装webpack-dev-server，运行命令`npm i webpack-dev-server -D`
2. 在`package.json`的`scripts`节点下新增`dev`脚本,脚本命令为`"dev":"webpack-dev-server"`
3. 在控制台运行`npm run dev`
4. 访问localhost:8080可以看到当前文件目录在浏览器中显示
5. 使用webpack-dev-server默认会将打包好的`bundle.js`存放到了内存中，并托管于项目的跟目录中，
   因此在浏览器中访问localhost:8080/bundle.js就可以看到文件内容
6. 此时由于生成的bundle.js被托管于根目录，所以index.html中引入bundle.js应该是`<script src="/bundle.js"></script>`
7. url中输入`localhost:8080/src/index.html`或`localhost:8080/src`即可访问index.html


+ webpack.config.js配置
```
const path = require('path');
module.exports = {
  entry:path.join(__dirname,'./src/index.js'),
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'
  }
}
```

+ index.js

```
import $ from 'jquery'

$(function(){
  $('li:even').css('background','red');
  $('li:odd').css('background','blue');
})
```

+ package.json中的devDependencies开发依赖

```
"devDependencies": {
  "webpack": "^3.10.0",
  "webpack-dev-server": "^2.11.1"
},
```