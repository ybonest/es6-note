### Promise对象
----------本篇主要参考阮一峰ESMAScript6入门，详请参考[ECMAScript6入门](http://es6.ruanyifeng.com/#docs/promise)


#### 介绍
+ Promise是一种异步解决方案，可以使异步操作以同步的方式展现，以避免回调函数导致的层层嵌套问题。


#### 特点
+ Promise三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)
    + Promise状态改变只有两种结果
        1. pending ---->  fufilled
        2. pending ---->  rejected


#### 缺点
+ Promise一旦新建就立即执行，无法中途取消
+ 其次，如果不设置回调函数，Promise内部抛出错误不会反应到外部
+ 当处于pending状态时，无法得知目前进展到哪一个阶段


#### 用法
```
const promise = new Promise(function(resolve,reject){
    // ... your code
    if(/*success*/){
        resolve(value);
    }else{
        reject(error);
    }
})
```

+ resolve(): 将Promise对象的状态从“未完成”变为“成功”，并将异步操作结果传出去
+ reject(): 将Promise对象的状态从“未完成”变为“失败”，并将失败结果传出去

Promise实例生成以后，可以用then方法指定resolve状态和reject状态的回调函数

```
promise.then(function(value){
    //success
},function(error){
    //failure
})
```

+ 实例一[链接](https://ybonest.github.io/es6-note/html/promise.html)
```
//es6 Promise对象
const promise = new Promise(function(resolve,reject){
    setTimeout(() => {
        resolve("success")
    },2000)
});
promise.then((result) => {
    console.log(result);
})
```

+ 实例二(ajax请求)

```
<script>
    const getJson = function(url) {
        const promise = new Promise(function(resolve,reject){
            const handFn = function() {
                if(this.readyState !==4 ){
                    return;
                }    
                if(this.status === 200 ){
                    resolve(this.response); //成功后将数据返回resolve对应的回调函数
                }else {
                    //失败-将错误信息传入reject对应的回调函数
                    reject(new Error(this.statusText))
                }
            }

            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET",url);
            xmlHttp.onreadystatechange = handFn;
            xmlHttp.responseType = "json";
            xmlHttp.setRequestHeader("Accept","application/json");
            xmlHttp.send();
        })
        return promise;
    }
    getJson("./myjson.json").then(function(json){
        console.log(json);
    },function(error){
        console.error(error);
    });
</script>
```

+ Promise的reject函数通常传递错误参数，而resolve函数除了正常值外，还可以传递其他Promise实例
```
<script>
    const p1 = new Promise(function(resolve,reject){
        setTimeout(()=>{
            console.log("p1");
            reject(new Error('fail'));
        },3000)
    });
    const p2 = new Promise(function(resolve,reject){
        setTimeout(()=>{
            console.log("p2");
            resolve(p1)
        },1000)
    })

    p2.then( result => console.log(result))
    .catch(error => console.log(error))
</script>
```

> 以上代码最终打印
