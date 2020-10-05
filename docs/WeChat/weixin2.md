---
title: 微信小程序npm包使用
date: 2018-12-05
categories:
  -  微信小程序
tags:
  -  微信小程序
---
## 小程序中引入 npm 及包的使用
1. 开发者工 => 详情 => 本地设置 => 勾选使用npm

2. 在项目当前目录中用cmd 新建package.json文件
```js
npm init -y
```
3. 在项目里安装依赖包，比如axios
```js
npm i -S axios
```
4. 在微信编辑器中菜单栏工具按钮选择构建npm选项

5. 在page页面和引入自定义组件一样的方式，引入miniprogram_npm包中的对应组件 或 在相应的文件中引入import
```js
// wx-axios-promise 是对wx.request 的封装，语法类似axios
import axios from '../../miniprogram_npm/wx-axios-promise/index'
// 对axios初始化
const Api = axios()
// 使用Api.get()
Api.get('url').then(res => {
            console.log(res);
        })
```
