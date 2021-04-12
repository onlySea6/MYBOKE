---
title: js 知识 3
showSponsor: true
date: 2018-03-01
categories:
  - js
tags:
  - js
---

## js 获取 dom 元素的方法

1. 通过 ID 获取 getElementById 返回一个 dom 元素 
2. 通过 name 属性 getElementByName
3. 通过标签名获取 getElementByTagName 伪数组
4. 通过类名 getElementByClassName 伪数组
5. 通过 css 选择器获取一个元素 querySelector
6. 选择获取一组元素 querySelectorAll

## innerText 和 innerHTML 的区别

- innerHTML 能够解析元素渲染标签
- innerText 不能解析元素会将标签渲染到页面

## 创建元素的三种方式

1. doucument.write(标签及内容) 会导致性能的浪费将删除所有的 HTML(仅用于测试)
2. dom 对象.innerHTML=“标签及内容” 会导致性能浪费，不建议大量拼接字符串，内存泄漏，不改变原有字符串而是创建新的字符串
3. doucument.createElement('标签名')

## 绑定事件

### addEventListener 为同一个元素绑定多个事件，谷歌、火狐、IE 不支持 解绑-->removeEventListenr

### attachEvent 为同一元素绑定多个事件 IE8 独有 IE11 不支持 解绑-->detach

## -----addEventListener 和 --------attachEvent 不同

1. 参数个数 ------- 3 个 ------- 2 个
2. 事件类型不同 -------- 不带 on -------- 带 on
3. 浏览器支持 ---火狐谷歌 IE11 支持 IE8 不支持 --------- 火狐谷歌 IE11 不支持 IE8 支持

## js 阻止事件的冒泡

1. e.stoppropagetion()谷歌火狐支持 IE8 不支持
2. window.event.canceBubble=true IE8 特有谷歌支持 低版本的火狐不支持

## 阻止默认行为
- return false(无兼容) 
- e.preventDdfault()

## 页面事件->可以用来处理cookie
1. window.onload页面加载事件 可以让（标签 属性）加载完毕执行 检测浏览器类型和版本
2. window.onunload页面关闭执行 
3. window.onbeforeunload 页面关闭前执行

## js 页面跳转
1. window.location.href='url'
2. window.open('url')
3. window.history.back(-1)返回上一页
4. window.history.go(-1/1)返回上一页或下一页
5. history.go('url')
7. window.location.reload()刷新当前页面

## 定时器
1. setInterVal(()=>{},1000)执行多次
2. setTimeOut(()=>{},1000)只会执行一次
3. window.requestAnimationFrame(()=>{})每隔16.6毫秒执行一次 用于动画 但是不好清理

## 获取dom元素的样式
1. window.getComputedStyle(dom元素,伪类) ->谷歌火狐支持 IE8不支持
2. dom元素.currentStyle.属性 IE8支持返回值是对象

## css 选择器的优先级

- id > class >标签 > \*

## 本地缓存
1. 利用storage来对数据进行存储(sessionStorage、localStorage）
   - sessionStorage 

临时的会话存储，只要当前的会话窗口未关闭，存储的信息就不会丢失，即便刷新了页面或者在编辑器中更改了代码，存储的会话信息也不会丢失。

设置存储setItem(key,value) 获取存储getItem(key) 删除存储remove(key)  全部删除clear()
   -  localStorage
是一种如果你不主动去清除，会一直将数据存储在客户端的储存方式，即使关闭了浏览器，下次打开的时候仍然可以看到之前存储的未主动清除的数据（即便是杀毒软件或者浏览器自带的清除功能，也不能将localStorage存储的数据清除掉）

设置存储setItem(key,value) 获取存储getItem(key) 删除存储remove(key)  全部删除clear()
2. cookie

cookie属于较老且最常见用的最多的技术了，cookie的优点很多，用起来也比较方便，默认过期时间是一个会话时间，设置过期时间expires

获取所有的cookie： document.cookie 
但是缺点也很多：
cookie兼容所有的浏览器，但其存储的数据是有大小限制的，一般同源是4kb；
cookie本地存储的数据会被发送到服务器（所以建议在服务器环境下使用cookie）；
跨域访问问题；浪费带宽等等；

## Ajax 

### 原理
Ajax的原理简单来说通过浏览器的javascript对象XMLHttpRequest(Ajax引擎)对象向服务器发送异步请求并接收服务器的响应数据，然后用javascript来操作DOM而更新页面。这其中最关键的一步就是从服务器获得请求数据。即用户的请求间接通过Ajax引擎发出而不是通过浏览器直接发出，同时Ajax引擎也接收服务器返回响应的数据，所以不会导致浏览器上的页面全部刷新。

### js中请求的步骤
1. 创建一个XMLHttpRequest异步对象
```js
var ajax=new XMLHttpRequest()
// 兼容问题
if(window.XMLHttpRequest){
     ajax=new XMLHttprequest() //ie7及更高
}else{
    ajax=new ActiveXObject('Microsoft.XMLHttp') //IE6、5以下
}
```
2. 设置请求方式和请求地址
```js
// true 表示是否异步  异步为true  同步false
ajax.open('GET','check.php?username='+this.value,true); 
```
3. 用send发送请求

4. 接收返回的数据
```js
//当AJAX引擎的状态产生改变时触发onreadystatechange属性指向的函数（多次执行）
//状态值有5个：0请求初始化 1已建立连接 2服务器接收请求 3正在处理请求 4服务器端响应就绪

ajax.onreadystatechange=function(){

//必须在服务器响应就绪，并且HTTP的状态码是200时才接收数据
//ajax.readyState 获取到服务器响应状态码，必须是4才表示就绪
//ajax.status 获取到HTTP的状态码，必须是200才表示成功
if(ajax.readyState==4 && ajax.status==200){
ajax.responseText
}}

//ajax.responseText 接收服务器响应回来的内容
//console.log(ajax.responseText);
//接收到服务器响应数据后，AJAX工作已完成，可根据结果显示提示信息
```
5. 最后，接收返回的数据

## get方法 出现缓存问题
1. 随机数 url+Math.random()
2. 时间戳 url+new Date().getTime()
## 编码问题
encodeURL()

## JS延迟加载的几种方式
1. defer 属性
- HTML 4.01 为 `<script>`标签定义了 defer属性。
用途：表明脚本在执行时不会影响页面的构造。也就是说，脚本会被延迟到整个页面都解析完毕之后再执行。
```js
 <script src="test1.js" defer="defer"></script>
```
2. async 属性
- HTML5 为 `<script>`标签定义了 async属性。与defer属性类似，都用于改变处理脚本的行为。同样，只适用于外部脚本文件。
目的：不让页面等待脚本下载和执行，从而异步加载页面其他内容。
3. 动态创建DOM方式
```js
//这些代码应被放置在</body>标签前(接近HTML文件底部)
<script type="text/javascript">  
   function downloadJSAtOnload() {  
       varelement = document.createElement("script");  
       element.src = "defer.js";  
       document.body.appendChild(element);  
   }  
   if (window.addEventListener)  
      window.addEventListener("load",downloadJSAtOnload, false);  
   else if (window.attachEvent)  
      window.attachEvent("onload",downloadJSAtOnload);  
   else 
      window.onload =downloadJSAtOnload;  
</script>  
```
4. 使用jQuery的getScript()方法
```js
$.getScript("outer.js",function(){//回调函数，成功获取文件后执行的函数  
      console.log("脚本加载完成")  
});
```
5. 使用setTimeout延迟方法
6. 让JS最后加载