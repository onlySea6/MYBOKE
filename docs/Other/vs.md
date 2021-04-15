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

## 命令行操作
```
ls 显示 当前文件夹下的具体文件列表
cd /tab   进入tab 文件件
cd .. 返回上一级文件夹

rm -rf index.html 永久删除index.html文件

mkdir test 新建一个test 文件夹



vim 语法
vi index.html  新建一个index.html
文件夹   
i 可以写入文件
esc 返回正常状态
:wp 保存并退出
:q! 不保存退出
```