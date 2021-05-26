---
title: API
date: 2018-5-1
sidebar: auto
categories:
  - css
tags:
  - css
---
##  水平居中元素的几种方式

- 行内元素: text-align: center
- 块级元素: margin: 0 auto
- position:absolute +left:50%+ transform:translateX(-50%)
- display:flex + justify-content: center

## 垂直居中

- 设置line-height 等于height
- position：absolute +top:50%+ transform:translateY(-50%)
- display:flex + align-items: center
- display:table+display:table-cell + vertical-align: middle;

## 1rem、1em、1vh、1px各自代表的含义？

1. rem
- rem是全部的长度都相对于根元素< html>元素。通常做法是给html元素设置一个字体大小，然后其他元素的长度单位就为rem。
2. em
- 子元素字体大小的em是相对于父元素字体大小
- 元素的width/height/padding/margin用em的话是相对于该元素的font-size
3. vw/vh
- 全称是 Viewport Width 和 Viewport Height，视窗的宽度和高度，相当于 屏幕宽度和高度的 1%，不过，处理宽度的时候%单位更合适，处理高度的 话 vh 单位更好。
4. px
- px像素（Pixel）。相对长度单位。像素px是相对于显示器屏幕分辨率而言的。

## 画一条0.5px的直线？

```css
height: 1px;
transform: scale(0.5);
```

## 画一个三角形？

```css
.a{
            width: 0;
            height: 0;
            border-width: 100px;
            border-style: solid;
            border-color: transparent #0099CC transparent transparent;
            transform: rotate(90deg); /*顺时针旋转90°*/
 }

<div class="a"></div>
```

## target、currentTarget的区别？

- currentTarget当前所绑定事件的元素
- target当前被点击的元素

## export和export default的区别？

- 使用上的不同
```js
export default  xxx
import xxx from './'

export xxx
import {xxx} from './'
```

## 什么是会话cookie,什么是持久cookie?
- cookie是服务器返回的，指定了expire time（有效期）的是持久cookie,没有指定的是会话cookie

## 深浅拷贝
```js
// 浅拷贝  或者=
Object.assign()
// 深拷贝
JSON.parse(JSON.stringify(obj))
// 深拷贝的函数
 function cloneDeep(source) {
      if (!isObject(source)) return source; // 非对象返回自身
      var target = Array.isArray(source) ? [] : {};
      for (var key in source) {
        if (source.hasOwnProperty(i)) {
          if (isObject(source[key])) {
            target[key] = cloneDeep(source[key]); // 注意这里
          } else {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
    function isObject(obj) {
      return typeof obj === 'object' && obj != null;
    }
```

## 模块化发展历程

- 可从IIFE、AMD、CMD、CommonJS、UMD、webpack(require.ensure)、ES Module、< script type="module"> 这几个角度考虑
1. IIFE： 使用自执行函数来编写模块化，特点：在一个单独的函数作用域中执行代码，避免变量冲突。
```js
(function(){
  return {
    data:[]
  }
})()
```
2. AMD： 使用requireJS 来编写模块化，特点：依赖必须提前声明好。
```js
define('./index.js',function(code){
    // code 就是index.js 返回的内容
})
```
3. CMD： 使用seaJS 来编写模块化，特点：支持动态引入依赖文件。
```js
define(function(require, exports, module) {  
  var indexCode = require('./index.js');
})
```
4. CommonJS： nodejs 中自带的模块化。
```js
var fs = require('fs');
```
5. UMD：兼容AMD，CommonJS 模块化语法。
```js
webpack(require.ensure)：webpack 2.x 版本中的代码分割。
```
6. ES Modules： ES6 引入的模块化，支持import 来引入另一个 js 。
```js
import a from 'a';
```

## fetch发送2次请求的原因

- fetch的post请求的时候，导致fetch 第一次发送了一个Options请求，询问服务器是否支持修改的请求头，如果服务器支持，则在第二次中发送真正的请求。

## img iframe script 来发送跨域请求有什么优缺点？

- iframe

优点：跨域完毕之后DOM操作和互相之间的JavaScript调用都是没有问题的

缺点：1.若结果要以URL参数传递，这就意味着在结果数据量很大的时候需要分割传递，巨烦。2.还有一个是iframe本身带来的，母页面和iframe本身的交互本身就有安全性限制。

- script

优点：可以直接返回json格式的数据，方便处理

缺点：只接受GET请求方式

- 图片ping
优点：可以访问任何url，一般用来进行点击追踪，做页面分析常用的方法

缺点：不能访问响应文本，只能监听是否响应

## Cookie如何防范XSS攻击
XSS（跨站脚本攻击）是指攻击者在返回的HTML中嵌入javascript脚本，为了减轻这些攻击，需要在HTTP头部配上，set-cookie：

- httponly-这个属性可以防止XSS,它会禁止javascript脚本来访问cookie。
- secure - 这个属性告诉浏览器仅在请求为https的时候发送cookie。

## 防范HTTPS中间人攻击

-  服务端在发送浏览器的公钥中加入CA证书，浏览器可以验证CA证书的有效性

## 解决css加前缀的问题
- 在线工具：Autoprefixer
- 文本编辑器插件：Sublime Text, Atom
- 代码库：Autoprefixer (PostCSS)

## 压缩CSS文件
- 在线工具：CSS Minifier, CSS Compressor
- 文本编辑器插件：Sublime Text, Atom
- 代码库：Minfiy (php), CSSO, CSSNano (PostCSS, Grunt, Gulp)

## 验证css
- 在线工具：W3 Validator, CSS Lint
- 文本编辑器插件：Sublime Text, Atom
- 代码库：stylelint (Node.js, PostCSS), css-validator (Node.js)

## 图片加载失败处理的方法 
```html
<img src="abc.jpg" onerror="onerror=null;src='123.jpg'" />
```

