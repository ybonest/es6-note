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

