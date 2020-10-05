---
title: 微信小程序混入
date: 2018-12-10
categories:
  -  微信小程序
tags:
  -  微信小程序
---
## 混入
- 用法和vue-mixis几乎一样，给component自定义组件使用
- 语法：Behavior
- 在 component 基础上扩展的外部实例，最后合并到 component 组件里；

## wxs
### 用在wxml中，增强page功能
- wxs是小程序的内置的一种语言，
- 对 page 页面的扩展，它可以作为.wxs 文件引入到 wxml 文件中；
也可以直接写在 wxml 文件里