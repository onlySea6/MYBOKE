---
title: ES6-Promise
date: 2018-10-05
categories:
 - ES6
tags:
 - ES6
---
## Promise:主要解决异步回调地狱的问题（封装了异步的回调形式，更加优雅可读性高，链式调用）
1. promise是什么？
- es6规定，```promise```对象是一个构造函数，用来生成一个promise实例，构造函数的参数是一个立即执行函数
- ```promise```对象用来封装一个异步操作，并可以获得其结果
2. 语法
```js
// promise 构造函数
new Promise( function(resolve, reject) {...} /* executor */  );
```
- resolve函数的作用：将promise对象的状态从“进行中”改变成“成功”，在异步操作成功时候调用，并将异步操作的结果
作为参数传递出去，resolve('value')这个值是任意值
- reject函数作用：将promise对象的状态从“进行中”改变成“失败”，在异步操作失败的时候调用，并将异步操作操作的
结果作为参数传递出去 reject('value')这个值是任意值
## Promise三种状态
1. pending：进行中
2. resolved：成功的状态
3. rejected：失败的状态
** promise的状态只能从pending变成resolved或者由pending变成rejected，不会从成功到失败，也不会失败之后再成功**
## Promise静态方法(构造函数上) ----挂载在函数原型下面的是动态方法
```js
var promise=new Promise(function(resolve,reject){
    resolve()
    //reject()
})
Promise.then(function(...res){}).catch(function(error){}).finally(function(){})
```
- then()方法第一个参数是获取成功的结果，第二个参数是获取失败的结果
- catch()捕获失败的结果，通常把成功写在then()里，把失败写在catch()里
- finally()无论成功还是失败都会执行的函数
- ```Promise.all([])```这个方法接收一个数组作为参数，数组的每一项都是promise对象，这个方法返回一个全新的promise对象
数组中每一个promise成功这个全新的promise状态才是成功，如果有一个失败，那么这个新的promise对象就是失败状态，这个全新的promise的值是数组中每个promise值组成的数组
- ```Promise.race([]) ```接收一个数组作为参数，数组的每一项都是promise对象，这个方法返回一个全新的promise对象，全新的
promise对象就是数组中的promise对象中执行最快的那一个