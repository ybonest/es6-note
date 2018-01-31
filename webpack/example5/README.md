此例是使用babel处理高级JS语法，webpack默认只能处理打包一部分高级js语法

### babel配置方式
+ 1.安装`babel-core`和`babel-loader`以及`babel-plugin-transform-runtime`
  - 执行`npm i babel-core babel-loader babel-plugin-transform-runtime -D`
+ 2.安装`babel-preset-env`和`babel-preset-stage-0`
  - `npm i babel-preset-env babel-preset-stage-0 -D`
+ 3.在module中的rules添加配置:`{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }`从而排除node_modules，以防打包时将node_modules中的内容打包进去
+ 4.添加.babelrc的babel配置文件，里面配置了babel用到到的语法和插件，注意，这个文件中，必须符合JSON规范，因此，不能使用单引号和注释
```
{
  "presets": ["env", "stage-0"],
  "plugins": ["transform-runtime"]
}
```