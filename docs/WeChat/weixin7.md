---
title: 微信小程序数据存储
date: 2018-12-10
categories:
  -  微信小程序
tags:
  -  微信小程序
---
## 全局数据
- globalData 属于小程序全局的共享数据对象
 - 写在app.js全局文件中（是一个对象），使用一般在page页面调用->getApp()获取小程序实例对象 
 - 用 该对象.globalData 来使用
 - 注意，这个global书存储在内存中，开发阶段页面刷新会丢失

 ## 本地数据存储
- 存数据用setStorageSync ：同步存储
- 存数据用setStorage ：异步存储
- 读取数据getStorageSync同步取值
- 读取数据getStorage：异步取值