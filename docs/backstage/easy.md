---
title: API
date: 2019-12-30
sidebar: auto
categories:
  -  easy-mock
tags:
  -  easy-mock
---
# 如何在Windows系统本地搭建easy-mock

## 搭建环境： node（version：8.9.0）、Redis（version：3.2.1）、MongoDB(version：3.4)

## 环境搭好
1. 下载easy-mock
```git
git clone https://github.com/easy-mock/easy-mock.git
```
2. 修改easy-mock中config内的配置文件：
```json
"host":"localhost"
```
3. 安装依赖
```js
yarn && npm i
```
## 启动
```js
npm run dev && yarn dev
```
## 访问本地easy-mock
```http
http://localhost:7300/
```
## 使用本地easy-mock模拟数据

## 参考地址
- [一个详细的博客](https://blog.csdn.net/qq_43646524/article/details/105160041)
- [我的地址](https://gitee.com/wj199624/easy-mock)
