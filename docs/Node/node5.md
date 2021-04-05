---
title: 前端接口
date: 2019-10-05
sidebar: auto
categories:
  - node
tags:
  - node
---

# node 报错
1. 安装报错

```js
ERROR: Failed to set up Chromium r818858! Set "PUPPETEER_SKIP_DOWNLOAD" env variable to skip download.
```
- 解决 安装命令加上 
```js
npm i xxx ignore-scripts //忽略依赖项的生命周期脚本
```