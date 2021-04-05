---
title: vscode
date: 2019-09-30
categories:
  - vscode
tags:
  - vscode
---
## vscode 利用插件进行接口测试
1. 在插件中心 搜索安装REST Client 
2. 新建一个文件 结尾以.http 结尾 a.http
3. 使用 语法固定
```js
@url=http://81.70.159.19:3000

### 注册 //这是注释

GET  {{url}}/register

?username=admin&password=111111        //get传参方式

### 登录
POST {{url}}/login

Content-Type: application/json

{"username":"admin","password":"111111"}   //post传参方式
```