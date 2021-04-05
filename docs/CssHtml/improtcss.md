---
title: API
date: 2018-5-1
sidebar: auto
categories:
  - css
tags:
  - css
---

## 标准的html结构文档

### pc版
```html
<!DOCTYPE html>
<html>
<head>
    <!-- 国际统一字符编码集一定要写在最前面 -->
    <meta charset="UTF-8">
    <!-- 解决浏览器兼容，以webkit内核解析，ie 以最高内核解析或以谷歌内核 -->
    <meta name="renderer" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>宇宙界</title>
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <meta name="keywords" content="宇宙界"/>
    <meta name="description" content="宇宙界"/>
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"/>
</head>
<body>
<div id="root"></div>
</body>
</html>
```

### H5版
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>宇宙界</title>
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <meta name="keywords" content="宇宙界"/>
    <meta name="description" content="宇宙界"/>
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"/>
    <!-- m 站 start -->
    <meta name="viewport" content="initial-scale=1,width=device-width,maximum-scale=1,minimum-scale=1,user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="address=no">
    <!-- m 站 end -->
</head>
<body class="body">
<div id="root"></div>
</body>
</html>
```

## 前端项目目录
```
以下均为文件夹
workspace
www.a.com
    项目
www.b.com
    项目
我自己的仓库
www.bd.com
    .gitignore
    webapp
        app
            pro1
        w
            pro1
        m
            pro1
        minstore
            pro1
    www.blog.cn
        lib
        m
        ui
        w
        minstore
        app 
    lib
        js
        css
    md
        read.md
    ui
        pageName
    unit
        share
        tourl
work
    app
        2021
            项目一
            需求文档
            开发文档
            设计稿
    pc
    m
```
## .gitignore
```
放到git 某一个仓库的根目录下

# compiled output
/dist
/dist-server
/tmp
/out-tsc

# dependencies
/node_modules
node_modules
# IDEs and editors
.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace
src/**/*.css
# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# misc
/.sass-cache
/connect.lock
/coverage
/libpeerconnection.log
npm-debug.log
testem.log
/typings

# e2e
/e2e/*.js
/e2e/*.map

# System Files
.DS_Store
Thumbs.db
```