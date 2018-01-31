----------------本文档主要参考webpack官方文档，文档请移步该处[链接](https://doc.webpack-china.org/concepts/)

### 概念
webpack是一个现代JavaScript应用程序的静态模块打包器(module bundler),当webpack处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle ----（来自官方文档解释）

webpack的四个核心概念
+ 入口(entry)
+ 输出(output)
+ loader
+ 插件(plugins)

### 入口[entry]
入口起点指示webpack应该要使用哪个模块，来作为构建其内部依赖图的开始。
+ webpack.config.js配置
  - 简写
  ```
  module.exports = {
    entry:'./path/to/my/entry/file.js'
  }
  ```

  - 正常写
  ```
  const config = {
    entry:{
      main:'./path/to/my/entry/file.js'
    }
  }
  module.exports = config;
  ```

+ 对象语法
```
const config = {
  entry:{
    app:'./src/app.js',
    vendors:'./src/vendors.js'
  }
};
```

+ 多页面应用程序
```
const config = {
  entry:{
    pageOne:'./src/pageOne/index.js',
    pageTwo:'./src/pageTwo/index.js',
    pageThree:'./src/pageThree/index.js'
  }
}
```

### 出口[output]
output属性告诉webpack在哪里输出它所创建的bundles,以及如何明明这些文件
+ webpack.config.js

```
const path = require('path');

module.exports = {
  entry:'./path/to/my/entry/file.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'my-first-webpack.bundle.js'
  }
}
```

