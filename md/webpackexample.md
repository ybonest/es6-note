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
实例二中虽然引入了webpack.config.js配置，并且在配置中引入了一个入口和一个出口，webpack可以根据这个进行js的打包和编译工作，但是仅仅这样还远远不够，因为每次修改相关文件后，我们需要重新执行webpack命令进行编译，所以实例三中引入了webpack-dev-server,它启动了一个使用express的Http服务器，这个Http服务器和client使用了websocket通讯协议，原始文件作出改动后，webpack-dev-server会实时的编译

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

**代码部分**
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

### 实例四
本例共引用了webpack的插件和loader

1. 使用webpack的插件(Plugins)配置
此例引入`html-webpack-plugin`插件
html-webpack-plugin它的作用就是把index.html页面，也托管到内存中，进一步增加网站在开发过程中，运行的速度；第二个作用：自动把打包好的bundle.js注入到页面中；

使用步骤
+ 安装:npm i html-webpack-plugin -D
+ 在webpack.config.js文件中导入`const HtmlWebpackPlugin = require('html-webpack-plugin')`
+ 增加配置将插件挂载到webpack中，配置如下：
```
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
  ]
}
```

2. 使用webpack的Loader
loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。
loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。
loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

本例中引入了处理css/scss/less以及引入图片时的loader
1. 转换css文件,css文件依赖`style-loader`和`css-loader`两个loader
  + 创建css样式文件，并在要打包的js文件中引入-->`import './css/a.css'`
  + 安装style-loader ---> `npm i style-loader -D`
  + 安装css-loader --->   `npm i css-loader -D`
  + 在webpack.config.js配置文件中的module节点中增加如下规则

  ```
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
        {test:/\.css$/,use:['style-loader','css-loader']} //配置css文件loader   
      ]
    }
  }
  ```

2. 转换scss文件,scss依赖`style-loader/css-loader/sass-loader/node-sass`
  + 创建scss样式文件，并在要打包的js文件中引入，-->`import './css/b.scss'` 
  + 安装依赖loader
    - style-loader 执行命令 `npm i style-loader -D`
    - css-loader 执行命令 `npm i css-loader -D`
    - sass-loader 执行命令 `npm i sass-loader -D`
    - node-sass 执行命令 `npm i node-sass -D`
  + 在webpack.config.js配置文件中的module节点中增加如下规则
  
  ```
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
        {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}
      ]
    }
  }
  ```

3. 转换less文件,less依赖`style-loader/css-loaderless-loader/less`
  + 创建less样式文件，并在要打包的js文件中引入，本例中是在index.js中引入的css-->`import './css/b.scss'`
  + 安装依赖loader
    - style-loader 执行命令 `npm i style-loader -D`
    - css-loader 执行命令 `npm i css-loader -D`
    - sass-loader 执行命令 `npm i less-loader -D`
    - less 执行命令 `npm i less -D`
  + 在webpack.config.js配置文件中的module节点中增加如下规则

  ```
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
        {test:/\.less$/,use:['style-loader','css-loader','less-loader']}
      ]
    }
  }
  ```

4. 处理css路径问题
此处主要引入url-loader和file-loader
具体配置如下

```
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
```

实例代码展示
+ package.json中的开发依赖

```
"devDependencies": {
  "url-loader": "^0.6.2",
  "css-loader": "^0.28.9",
  "file-loader": "^1.1.6",
  "html-webpack-plugin": "^2.30.1",
  "less": "^2.7.3",
  "less-loader": "^4.0.5",
  "node-sass": "^4.7.2",
  "sass-loader": "^6.0.6",
  "style-loader": "^0.20.1",
  "webpack": "^3.10.0",
  "webpack-dev-server": "^2.11.1"
}
```

+ webpack.config.js配置

```
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
```

+ index.js

```
import $ from 'jquery';
import './css/a.css';  //引入css
import './css/b.scss';  //引入scss
import './css/c.less';  //引入less

$(function(){
  $('li:even').css('background','red');
  $('li:odd').css('background','yellow');
})
```


### 实例五
本例是引入了babel，babel是用来处理高级JS语法

babel配置方式
+ 1.安装`babel-core`和`babel-loader`以及`babel-plugin-transform-runtime`
  - 执行`npm i babel-core babel-loader babel-plugin-transform-runtime -D`
+ 2.安装`babel-preset-env`和`babel-preset-stage-0`
  - `npm i babel-preset-env babel-preset-stage-0 -D`
+ 3.在module中的rules添加配置:`{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }`从而排除node_modules，以防打包时将node_modules中的内容打包进去
+ 4.根目录添加.babelrc的babel配置文件，里面配置了babel用到到的语法和插件，注意，这个文件中，必须符合JSON规范，因此，不能使用单引号和注释
```
{
  "presets": ["env", "stage-0"],
  "plugins": ["transform-runtime"]
}
```

代码展示
+ webpack.config.js配置

```
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
```

+ index.js
```
import $ from 'jquery';
$(function () {
  $('li:odd').css('background', 'red');
  $('li:even').css('background', 'yellow');
})
class Person {
  static info = { country: 'China' }
}
console.log(Person.info);
```

### 实例六
本例主要介绍在package.json文件中配置webpack-dev-server启动方式,如下
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open chrome --port 3000 --host 192.168.171.58 --compress --progress --hot"
  },
```

+ `--open chrome`表示默认执行后自动打开浏览器，并且以chrome浏览器打开
+ `--port 3000`设置`webpack-dev-server`启动端口，默认8080
+ `--host 192.168.163.31`设置`webpack-dev-server`启动IP
+ `--compress`设置打包文件压缩
+ `--progress`设置启动时在控制台所显示进度条
+ `--hot`热更新/热刷新/热重载,更够提高打包的效率，因为热更新只是把需要重新打包的代码编译了一下，并以补丁的形式，热更新到了页面中，并没有重新编译整个项目,而且`--hot`也能够实现页面的无刷新重载(这个无刷新重载对JS无效，只对CSS有效)

以上六例详细代码请到github仓库[下载](https://github.com/ybonest/es6-note.git),代码存放在webpack目录下