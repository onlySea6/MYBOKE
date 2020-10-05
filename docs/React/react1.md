---
title: react基础
date: 2019-09-30
categories:
  - react
tags:
  - react
---

## 创建 react 之前做的准备

- 如果你电脑上安装过 create-react-app 脚手架 需要卸载(新版本换了创建命令)

```js
npm unistall -g create-react-app
```

- 新版的创建命令

```js
npx create-react-app 项目名称
```

## react 的项目结构

![react项目结构](https://s1.ax1x.com/2020/09/23/wjkmGt.png)

## React 介绍

1. react 是干什么的？
   构建用户界面的 javascript 库。

2. react 能干什么？
   开发网站，单页面应用，手机 app

vue 和 react 几乎在使用上和原理上非常的相似，vue 最初就是借鉴的 react 思想开发的

3. react 好处：
   api 非常少，使用起来很简单，灵活。

react 函数式编程思想（声明式编程）

## react 原理

1. 数据单向绑定

2. 数据流--单向数据流

- vue 单向数据流 != 数据单向绑定

他和 vue 不同的地方：数据单向绑定的

3. 基于函数和类运作的【函数组件和类组件】

## 运行项目

1. 启动本地项目开发环境

```js
npm run start  或 yarn start
```

2. 打包 src 源码，变成原始的 js 和 html，

```js
npm run build
```

- 还是需要使用服务端启动,如下：

```js
npm install -g serve
和
serve -s build
```

3. 释放我们项目【官方】配置文件，且该命令只能运行一次，不可恢复

```js
npm run eject
```

<font color="red" size="5">注意</font>：npm run eject 我们创建项目的时候，官方会给初始化一个 git 仓库

## 模块化开发

- 好处：解耦，便于维护和开发
- 复用：哪儿用就给它引入到哪儿
