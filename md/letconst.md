ES6以前声明使用var声明变量，var声明的变量存在声明提升，并且无块级作用域，因此ES6引入了let和const

### let命令
+ let命令声明的变量类似于var，但是它声明的变量存在块级作用域，也就是说它只在自己所声明的代码块有效
```
{
  let a = 10;
  var b = 1;
}
console.log(a);  //报错，因为let声明的a只在代码块中有效
console.log(b);  //输出1
```

看如下代码对比var和let的不同

```
var funcs = [];
for(var i=0;i<10;i++){
  funcs.push(function(){
    console.log(i);
  })
}
funcs.forEach(function(func){
  func();
})
```
上例中因为var声明i并没有块级作用域，因此自始至终只有一份i，所有最终输出的是10个10

ES6以前解决以上问题需要使用闭包
```
var funcs2 = [];
for(var j=0;j<10;j++){
  funcs2.push((function(value){
    return function(){
      console.log(value);
    }
  }(j)))
}
funcs2.forEach(function(func){
  func();
})
```
此例最终输出0,1,2,3,4,5,6,7,8,9

而出现ES6以后解决这种问题变的极为简单，只需要使用let定义for循环中的变量
```
var funcs3 = [];
for(let g=0;g<10;g++){
  funcs3.push(function(){
    console.log(g);
  })
}
funcs3.forEach(function(func){
  func();
})
```
