---
title: Ajax
date: 2019-04-15
categories:
  - Ajax
tags:
  - Ajax
---
## Ajax是什么能做什么
- Ajax是服务器交换的技术，实现页面的局部刷新不需要加载整个页面，提高性能（百度的提示）
- 显示新的HTML内容而不载入整个页面 
- 提交一个表单并且立即显示出结果
- 登录而不用跳转到新的页面
- 星级评定组件
- 遍历数据库信息加载更多而不刷新页面

## Ajax在jquery的应用
```js
$.ajax()
```
![ajax参数](https://s1.ax1x.com/2020/10/05/0tSeOg.png)

## Ajax使用流程与步骤
1. 创建ajax对象  ```js var xhr=new XMLHttpRequest()```
2. 建立连接  ```js xhr.open('请求方式','请求地址',是否异步) ```
3. 发送请求 ```js xhr.send() ```
4. 等待执行
```js
xhr.onreadystateChange=function(){
    if(xhr.readyState==4){//判断ajax对象的状态
        if(xhr.status==200||xhr.status==300){//判断服务器的状态
            xhr.responseText  //当以上两个判断条件都成立以后 可以获取数据了，从xhr对象里面获取，返回的数据
                            //  保存在responseText属性下面
        }
    }
}
```
- 执行事件：onreadystateChange这个事件描述ajax工作流程的状态变化，每次ajax的工作状态变化都会执行这个方法

- readyState：描述的xhr对象的工作状态 有5个值 0-4
- 0：请求初始化 1：已建立连接 2：服务器已接受请求  3：正在处理请求 4：服务器处理请求完成，并准备就绪，返回给客户端

## Ajax的兼容问题
```js
var xhr 
if(window.XMLHttpRequest){
    xhr=new XMLHttpRequest()//ie7及以上高版本浏览器
}else{
    xhr=new ActiveXObject('Microsoft.XMLHTTP');//ie5 ie6以下
}
```
## get方法存在的问题及解决
1. 缓存问题（ie会把请求的结果存到缓存中去，认为url地址不变结果就不变）
- 解决1：随机数：“url?t=”+Math.random()
- 解决2：时间戳：“url?t=”+new Date().getTime()
2. 编码问题(ie中各式不对 服务器读取不到)
- 解决 encodeRI()按照 utf-8编码

## http状态码(快速定位问题的原因)
- 200请求成功，从服务器获取数据成功
- 304 请求成功，从缓存中获取数据成功
- 400客户端请求语法错误，服务器无法解析
- 403禁止请求 fobbiden
- 404请求地址找不到，not found
- 405请求方法不允许 method not allowed
- 500及以上 服务器错误

## JSON与string的装换
- JSON.parse() 用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
- JSON.stringify() 方法将一个 JavaScript 对象或值转换为 JSON 字符串，如果指定了一个 replacer 函数，则可以选择性地替换值，或者指定的 replacer 是数组，则可选择性地仅包含数组指定的属性。
