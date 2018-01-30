此例主要介绍在package.json文件中配置webpack-dev-server启动方式,如下
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open chrome --port 3000 --host 192.168.171.58 --compress --progress"
  },
```

+ `--open chrome`表示默认执行后自动打开浏览器，并且以chrome浏览器打开
+ `--port 3000`设置`webpack-dev-server`启动端口，默认8080
+ `--host 192.168.163.31`设置`webpack-dev-server`启动IP
+ `--compress`设置打包文件压缩
+ `--progress`设置启动时在控制台所显示进度条