---
title: vue进阶
date: 2019-09-30
categories:
  - vue
tags:
  - vue
---
## Flow 基本语法
- Vue、Vuex 等源码使用了 Flow 静态类型检查工具。
- JavaScript 是弱类型的语言，所以我们在写代码的时候容易出现一些始料未及的问题。也正是因为这个问题，才出现了 Flow 这个静态类型检查工具。
- 这个工具可以改变 JavaScript 是弱类型的语言的情况，可以加入类型的限制，提高代码质量。
```js
// 未使用 Flow 限制
function sum(a, b) {
  return a + b;
}

// 使用 Flow 限制  a b 都是 number 类型。
function sum(a: number, b:number) {
  return a + b;
}
```
#### 基础检测类型
Flow 支持原始数据类型，有如下几种：
```
boolean
number
string
null
void( 对应 undefined )
```
- 在定义变量的同时在关键的地方声明类型，使用如下：
```js
let str:string = 'str';
// 重新赋值
str = 3  // 报错
```
#### 复杂类型检测
Flow 支持复杂类型检测，有如下几种：
```
Object
Array
Function
自定义的 Class
```
- 需要注意直接使用 flow.js，JavaScript 是无法在浏览器端运行的，必须借助 babel 插件，vue 源码中使用的是 babel-preset-flow-vue 这个插件，并且在 babelrc 进行配置。

## 有的人把观察者模式和发布/订阅模式混淆一谈，其实订阅模式有一个调度中心，对订阅事件进行统一管理。而观察者模式可以随意注册事件，调用事件。
![两种模式的流程图](https://ask.qcloudimg.com/http-save/yehe-1462769/ghgcrz7l0y.jpeg?imageView2/2/w/1620)
