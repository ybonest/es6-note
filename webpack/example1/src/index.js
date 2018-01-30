import $ from 'jquery'
//此例子通过全局安装webpack生成
//执行命令 npm i webpack -g  全局安装，将webpack安装到C:\Users\Administrator\AppData\Roaming\npm
//安装jquery ---`npm install jquery`
//在index.js使用es6语法引入 `import $ from 'jquery'`
//执行webpack ./src/index.js ./dist/bundle.js
//执行成功后将在dist目录下生产bundle.js文件，该js文件综合了jquery和index.js
$(function(){
  $('li:even').css('background','red');
  $('li:odd').css('background','yellow');
});