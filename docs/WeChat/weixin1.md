---
title: 微信小程序基础
date: 2018-12-05
categories:
  -  微信小程序
tags:
  -  微信小程序
---
## 小程序 介绍和使用
### 设置通用设置--->把提示勾上  
### 设置项目设置--->使用npm  不校验合法域名
### 学习主要内容
1. 组件化
2. 模块
3. 种渲染方式，显示隐藏，循环渲染
4. 路由 路由传参
5. 生命周期
6. 数据存储 微信中（全局数据，本地存储）
7. 如何在小程序里使用第三方包插件
8. 组件，页面，全局入口
9. 组件通信

### 项目结构

#### 小程序的三大组成部分
- component 方法用来注册组件--公共模板
- Page 方法用来注册页面
- App 方法用来注册全局入口
##### 入口
App方法构造入口全局的组件
在整个小程序里只能有一个App实例
配置全局数据
路由拦截
##### 页面
page方法构造页面组件
使用组件需要在json文件中的：
```js
"usingComponents": {
        "组件名": "../../components/swiper/swiper"
    },
```
### 默认启动首页地址
- entryPagePath

### template的使用

- template中：name定义 is使用   
- 使用import加载外部wxml文件的template并且data属性传参
- include标签是加载外部的wxml文件除了template其他内容全部引入

### 内置的指令
1. wx:for 遍历渲染
- 会默认在当前作用域里产生index和item
```js
 //wx:for-index="" //给index别名
// wx:for-item="" //给item别名
  <swiper-item wx:for="{{list}}" wx:key="index">
      <image src="{{item}}" />
    </swiper-item>
```
2. wx:if 渲染与销毁（v-if）
- wx:elif
- wx:else
3. hidden 控制显示与隐藏

### 事件系统
1. 绑定事件（bind）
2. 绑定自定义事件（bind:eventName）
3. 触发自定义事件triggerEvent('eventName',params）
4. 禁止冒泡：catch:eventName
5. 互斥绑定：mut-bind:eventName

### 在小程序里字符串 "false"会被当成true 所以设置成 {{false}}

### "{{}}" 双引号和大括号之间不能有空格 不让会解析成字符串