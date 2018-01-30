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