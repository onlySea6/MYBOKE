---
title: 微信小程序生命周期
date: 2018-12-05
categories:
  -  微信小程序
tags:
  -  微信小程序
---
## App 生命周期
命令 | 阶段 | 
:-:|:-|-:
onLaunch|小程序初始化|
onShow|小程序显示--切换|
onHide|小程序隐藏|

## Page 生命周期(各下js)
- onLoad 页面加载 在这里发起自动请求，路由传递的参数也在该函数里获取 执行一次
- onShow 页面显示 执行多次
- onReady 页面初次渲染完成 只会执行一次
- onHide 页面隐藏 执行多次
- onUnload 页面卸载（销毁） 页面被关闭了 ,在这里清除定时器、全局变量、轮询接口

## Page里的两个常用函数
- onPullDownRefresh 监听用户下拉动作 下拉请求数据（刷新）
- onReachBottom 页面上拉触底事件的处理函数 用户向上拉（向上滚动）到底的时候，加载数据等

## component 生命周期
- created
在组件实例刚刚被创建时执行，注意此时不能调用 setData
- ready
在组件布局完成后执行
- detached
在组件实例被从页面节点树移除时执行（等价于销毁）