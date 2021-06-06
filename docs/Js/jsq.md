---
title: 面试题
date: 2018-02-01
categories:
  - js
tags:
  - js
---
## 从浏览器地址栏输入url到显示页面的步骤(以HTTP为例)
- 地址[前端面试题](https://github.com/webSongNO1/FE-interview#%E5%89%8D%E7%AB%AF%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E5%93%AA%E4%BA%9Bseo)

## cookie隔离
- cookie隔离技术则是通过使用多个非主要域名来请求静态文件，如果静态文件都放在主域名下，那静态文件请求的时候带有的cookie的数据提交给server是非常浪费的，还不如隔离开

## flash和js通过什么类如何交互
- flash和js通过类ExternalInterface进行交互。
- ExternalInterface有两个方法call和addCallback：
1. ExternalInterface.addCallback("在js里可调用的flash方法名",flash内方法)       //在js里调用flash里的方法
2. ExternalInterface.call("js方法",传给js的参数)          