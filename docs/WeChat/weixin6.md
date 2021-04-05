---
title: 微信小程序路由
date: 2018-12-10
categories:
  -  微信小程序
tags:
  -  微信小程序
---

## 路由系统(拿navigate举例)
```js
<text>使用标签跳转</text>
<view class="" hover-class="none" hover-stop-propagation="false">
    <navigator open-type="navigate" url="/pages/cycle/cycle">正常跳转到生命周期页面</navigator>
</view>
```
### open-type属性
- navigate(Object object)（默认） 只能跳转非tabbar页面，并且不会关闭当前页面，所以会有返回导航
- switchTab(Object object) 只能跳转到tabBar页面，并关闭所有非tabBar页面
- redirectTo(Object object) 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面，
不会出现返回导航，但有一个返回首页的图标按钮
- reLaunch(Object object)关闭所有页面，打开到应用内的某个页面，当跳转到非tabbar页面时会显示一个返回首页的图标按钮
- navigateBack(Object object)关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层

## 路由传参
1. 传参用 query :" ?name=web&age=10"
```js
<navigator class="nav" url="/pages/cycle/cycle?name={{name}}">正常跳转到生命周期页面</navigator>
```
2. 获取值 ：pages页面里使用onload 函数接收
 ```js
// pages/cycle/cycle.js 在onLoad中接收参数
Page({
   
    data: {
        text: "",
    },
    /*** 生命周期函数--监听页面加载*/
    onLoad: function (options) {
        console.log(options.name);
        // 改变数据
        this.setData({
            text: options.name
        })
    },
})
 ```
## 路由的跳转方式
js跳转

路由方式	|触发时机|	路由前页面|	路由后页面
:-:|:-|:-|-:
初始化|	小程序打开的第一个页面|		|onLoad, onShow
打开新页面|	调用``` API wx.navigateTo```使用组件 ```<navigator open-type="navigateTo"/>```	|onHide	|onLoad, onShow
页面重定向|	调用``` API wx.redirectTo```使用组件 ```<navigator open-type="redirectTo"/>```	|onUnload|	onLoad, onShow
页面返回|	调用``` API wx.navigateBack```使用组件```<navigator open-type="navigateBack">```用户按左上角返回按钮|	onUnload|	onShow
Tab 切换|	调用 ```API wx.switchTab```使用组件``` <navigator open-type="switchTab"/>```用户切换 Tab|		|各种情况请参考下表
重启动|	调用 ```API wx.reLaunch```使用组件 ```<navigator open-type="reLaunch"/>```|	onUnload|	onLoad, onShow



* 注意
- wx.navigateTo, wx.redirectTo 只能打开非 tabBar 页面。
- wx.switchTab 只能打开 tabBar 页面。
- wx.reLaunch 可以打开任意页面
- 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
- 调用页面路由带的参数可以在目标页面的onLoad中获取。