---
title: js 知识 3
date: 2018-03-01
categories:
  - js
tags:
  - js
---

## js 获取 dom 元素的方法

1. 通过 ID 获取 getElementById 返回一个 dom 元素 2.通过 name 属性 getElementByName
2. 通过标签名获取 getElementByTagName 伪数组
3. 通过类名 getElementByClassName 伪数组
4. 通过 css 选择器获取一个元素 querySelector
5. 选择获取一组元素 querySelectorAll

## inderText 和 innerHTML 的区别

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
