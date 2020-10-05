---
title: 微信小程序的请求
date: 2018-12-10
categories:
  -  微信小程序
tags:
  -  微信小程序
---
## wx.request()微信小程序内置的请求接口的方法
- 参数如下：

属性|	类型|	说明
:-:|:-|-:
url	|string|	开发者服务器接口地址
data|	string/object/ArrayBuffer|	请求的参数
header|	Object|	设置请求的 header，header 中不能设置 Referer。
content-type|	application/json	|
method|	string|	HTTP 请求方法
dataType	|string|	返回的数据格式
responseType|	string|	响应的数据类型
success	|function|	接口调用成功的回调函数
fail|	function|	接口调用失败的回调函数
complete|	function|	接口调用结束的回调函数（调用成功、失败都会执行）

## 取消请求
1. 设置一个全局变量
```js
var glob = null;
Page({
})
```
2. 将wx.request 赋给全局变量，
```js
glob = wx.request({
            url: "http://127.0.0.1:5500/router/api/data.json",
            // 成功
            success: function (data) {
                console.log(data);
                // 停止下拉刷新
                wx.stopPullDownRefresh()
            },
            // 失败
            fail: function () {
                // 如果失败了，强制下拉刷新
                wx.startPullDownRefresh()
            }
        });
```
3. 取消
```js
onUnload: function () {
        if (glob) {
            glob.abort()
        }
    },
```