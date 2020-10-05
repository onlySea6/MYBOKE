---
title: 微信小程序pages通信
date: 2018-12-05
categories:
  -  微信小程序
tags:
  -  微信小程序
---
## 发送
- 发送数据的页面
```html
<!-- wxml页面  -->
    <view class="inputmax">
        <!--  bind:input="username" 获取input框的数据 -->
        <input class="inputbox" bind:input="username" type="text" placeholder="First Name"></input>
        <input class="inputbox" bind:input="password" type="text" placeholder="Email Address"></input>
        <navigator url="/pages/index/index?name={{name}}&pass={{pass}}" class="butt">
        <!-- ?name={{name}}&pass={{pass}} 拼接在路径中传递 -->
            <span class="inputfoot">SUBSCRIBE</span>
        </navigator>
    </view>
```
- 发送的数据 / 方法
```js
// js页面
Page({
    data: {
        pass: "",
        name: "",
    },
    onLoad: function (options) {
    },
    username(e) {
        this.setData({
            name: e.detail.value
        })
    },
    password(e) {
        this.setData({
            pass: e.detail.value
        })
    },
})
```
## 接收及使用
- 接收
```js
Page({
    data: {
        text: "",
        }

    onLoad: function (data) {
        this.setData({
            text: data
        })
        console.log(data);
    }
})
```
- 使用
```html
  <view>
        {{text.name}}
        {{text.pass}}
    </view>
```