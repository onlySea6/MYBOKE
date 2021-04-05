---
title: react基础
date: 2019-09-30
sidebar: auto
categories:
  - react
tags:
  - react
---
## react是什么？

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。
使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”

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
![开发过程的项目](https://s3.ax1x.com/2020/11/23/DGOwcD.png)
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

## props.children

- 每个组件都可以获取到 props.children。它包含组件的开始标签和结束标签之间的内容。

## react中的 JSX 语法 => js+xml( html )
- 什么是jsx jsx只是一种语法糖 通过bable转译
1. JSX的特点
```html
-  只能有一个根元素 
-  <></>代表dom  {}表示js  <></>=<React.Fragment key='1'></React.Fragment> 但是空标签不能给任何属性 React.Fragment可以给key 只能给key
-  class=>className  class关键字
-  for=> HtmlFor
-  style要写成对象形式 写双大括号{{}}  第一个大括号表示js 第二个表示style对象
-  innerHtml 防止xss攻击 =>dangerouslySetInnerHTML <p dangerouslySetInnerHTML={{__html:inm}}></p>(固定写法)
  千万不要相信用户数据输入的内容  输入的转成字符串就可以防止xss
- js语法注释 单行注释注意换行 {//这是单行注释}  {/***这是多行注释*/}
-  事件 on加上驼峰命名法
-  {}要有返回值
-  布尔类型 、Null、 undefined渲染的时候会被忽略，但是这是合法的
```
## react 使用 .scss 样式文件时 别安装提示的node-sass 使用sass sass-loader -D

## react css具有作用域
1. 新建css文件 文件名固定
```js
myStyle.module.css
```
2. 引入使用
```js
import myStyle from './myStyle.module.css'
```
```html
  <div className="main" className={myStyle.st}>
  </div>
```
## react中如何解决事件中event对象在异步中发生的问题

- event.persist()

## react 创建项目 sass router mobx (算是完整版)
### 创建项目第一步 基本搭建
1. 在创建之前，需要有一个git 仓库，我们要把项目搭建到git 中

查看node 版本
node -v
或
使用nvm 进行node 版本安装与切换

```
1、node 版本
nvm use v14
    Now using node v14.15.3 (npm v6.14.9)
node -v
    v14.15.3
为了保证同步，选择node 版本14
2、开始创建项目
npx create-react-app my-app
    官方标准命令，my-app 为项目名称
    npx create-react-app scss-route-mobx
....
3、git仓库提交
这块你要进行git 提交  主要在企业做项目就应该放到仓库中，如果企业没有，那自己也要弄个仓库，哪天在家改个东西，或像今年的疫情在家办公所以，只要远程仓库有代码，电脑就是另一个事了。
4、cd scss-route-mobx  进入项目目录
    先进入到这个项目目录
5、yarn eject  开启配置文件
    这时候先不着急启项目，先把配置文件开启就是webpack 这些基础配置开启
6、yarn start   启动项目
    这时候你再起项目。 算是勉强创建了一个项目
```
2. 创建项目第二步 sass安装 sass的使用应个人需求不同而不同
```
1、 sass 安装
yarn add node-sass-chokidar
yarn add npm-run-all
2、修改package.json
"scripts": {
        "build-css": "node-sass-chokidar src/ -o src/",
        "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive  --use-polling --polling-interval 1000",
        "start-js": "node scripts/start.js",
        "start": "npm-run-all -p watch-css start-js",
        "build-js": "node scripts/build.js",
        "build": "npm-run-all build-css build-js",
        "test": "node scripts/test.js --env=jsdom"
},
```
3. 创建项目第三步 yarn build 打包注意事项
```
新建一个.env文件与package.json 同在根目录下
GENERATE_SOURCEMAP=false
以下三种路径
PUBLIC_URL=https://www.a.com/
PUBLIC_URL=./
PUBLIC_URL=/
```
启动成功并编译成功表示react项目创建成功
至此 一个基本的react 项目算是创建成功了

4. 创建项目第四步 react react-router 路由
```
react 的文件目录是怎么样
1、pubilc
    - index.html
    - favicon.ico
    - manifest.json
        移动App的配置文件,用于指定应用的显示名称、图标、入口页面等信息.
2、src
    - components
        - alert
            index.jsx
        - footer
            index.jsx
        - nav
            index.jsx
        比如：
        导航、弹出层、loading加载动画、分页器等
    - images
        凡事页面中<img src>标签使用的图片
    - js
        页面中编写的js功能及开发文件
    - store
        redux
        mobx
        context
    - styles
        img/
        css、less、scss
    - unit
        js一些组件
        比如，
            如果不用jq,自己封装一些js 的方法
            如果手机端有活动页面都需要下载app,同的app 的判断
            如果有弹出去js等
    - view
        home
            index.jsx
        about
            index.jsx
        joined
            index.jsx
            list.jsx
            other.jsx
    - other
```
```
1、导入包
yarn add react-router-dom;

PS:
react-router 和 react-router-dom

react-router: 实现了路由的核心功能。
react-router-dom: 基于react-router，加入了在浏览器运行环境下的一些功能。

react-router-dom 是 react-router 的加强版呗

因为 React Native 也要路由系统呀。所以还有一个库叫 react-router-native，这个库也是基于 react-router 的，它类似 react-router-dom，加入了 React Native 运行环境下的一些功能。


react-router-dom
react-router-native

React BrowserRouter和HashRouter的区别

BrowserRouter：h5路由（history API）
HashRouter：哈希路由

主要区别

BrowserRouter 和 HashRouter 都可以实现前端路由的功能

BrowserRouter 实现的是单页面的路由切换
HashRouter 实现的是全局路由切换

从原理上

HashRouter在路径中包含了#，相当于HTML的锚点定位。（# 符号的英文叫hash，所以叫HashRouter，和散列没关系哦））

而BrowserRouter使用的是HTML5的新特性History，没有HashRouter(锚点定位)那样通用，低版本浏览器可能不支持。

从用法上

BrowserRouter进行组件跳转时可以传递任意参数实现组件间的通信，而HashRouter不能(除非手动拼接URL字符串)，因此一般配合Redux或mobx使用，实现组件间的数据通信。
```
* 2. 新增加Router.js文件
```
import React from 'react';

import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';

import App from './App.js';

const Router = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)
export default Router;
```
* 3. 修改index.js
```
原App 换成

import Router from './Router';

<Router />
```
* 4. App.js
```
import React , { Componet } from 'react';
import { withRouter,NavLink,Switch,Redirect,Route} from 'react-router-dom';

import Home from './view/home';
import Input from './view/input';
import Event from './view/event';

class App extends Component {
    render(){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/input" component={Input} />
                <Route path="/event" component={Event} />
            </Switch>
        );
    }
}
export default App;
```
* 5. 新增页面
```
./view/home/index.jsx
./view/input/index.jsx
./view/event/index.jsx
内容自定义

import { withRouter,NavLink,Switch,Redirect,Route} from 'react-router-dom';

<NavLink to="/">首页</NavLink>
<NavLink to="/input">表单</NavLink>
<NavLink to="/event">事件</NavLink>
```
```
import React , { Component } from 'react';
import { withRouter,NavLink,Switch,Redirect,Route} from 'react-router-dom';
class View extends Component {
    render(){
        return (
            <React.Fragment>
                <div className="mian">这是首页面</div>
                <NavLink to="/">首页</NavLink><br/>
                <NavLink to="/input">表单</NavLink><br/>
                <NavLink to="/event">事件</NavLink>
            </React.Fragment>
        )
    }
}
export default View;
```

## 设置代理、nginx 路由配置、跨域处理
1. src/setupProxy.js 创建文件
2. yarn add http-proxy-middleware
```js
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
      '/home',createProxyMiddleware({
        target: 'https://#####.com/',
        changeOrigin: true,
      })
    );
    app.use(
      '/wp-json',createProxyMiddleware({
        target: 'https://#####.cn/',
        changeOrigin: true,
      })
    );
};

```
3. yarn add axios
4. 页面引入axios
```js
// 封装的方法
async getApi(url, cfg, headers) {
		let data = await axios.get(
			url,
			{ params: cfg },
			{
				headers: headers,
			}
		)
		return data
    }
    ajax () {
        	const obj = {
				mediareports: {
					page_number: '2',
					page_size: '10',
				},
			}
			const cfg = this.obj
			this.getApi('/home/mediareports', cfg, {}).then((res) => {
				console.log(res.data)
			})
    }
	componentDidMount() {
        this.ajax()
	}
```

## 封装的一个动画
```scss
@charset "UTF-8";
/**
使用方法
*/
// @include keyframes(anMeinv,(
//     0%:(
//         background: url(i/meinv.png) no-repeat pxToRem(140) pxToRem(11),
//         background-size: pxToRem(165) pxToRem(157)
//     ),
//     50%:(
//         background: url(i/meinv.png) no-repeat pxToRem(140) pxToRem(11),
//         background-size: pxToRem(265) pxToRem(257)
//     ),
//     75%:(
//         background: url(i/meinv.png) no-repeat pxToRem(140) pxToRem(11),
//         background-size: pxToRem(565) pxToRem(657)
//     ),
//     100%:(
//         background: url(i/meinv.png) no-repeat pxToRem(140) pxToRem(11),
//         background-size: pxToRem(465) pxToRem(557)
//     )
// ));
// @include animation(anMeinv 2s ease-out forwards);



$browserPrefix:('-webkit-','-moz-','-ms-','-o-','');
@mixin transition($obj){
    @each $i in $browserPrefix{
        #{$i}transition:$obj;
    }
}
@mixin transform($obj){
    @each $i in $browserPrefix{
        #{$i}transform:$obj;
    }
}
@mixin animation($obj){
    @each $i in $browserPrefix{
        #{$i}animation:$obj;
    }
}
@mixin keyframes($name,$obj){
    @-webkit-keyframes #{$name}{
        @each $i,$val in $obj{
            #{$i}{
                @each $j,$val2 in $val{
                    #{$j}:$val2;
                }
            }
        }
    }
    @-moz-keyframes #{$name}{
        @each $i,$val in $obj{
            #{$i}{
                @each $j,$val2 in $val{
                    #{$j}:$val2;
                }
            }
        }
    }
    @-ms-keyframes #{$name}{
        @each $i,$val in $obj{
            #{$i}{
                @each $j,$val2 in $val{
                    #{$j}:$val2;
                }
            }
        }
    }
    @-o-keyframes #{$name}{
        @each $i,$val in $obj{
            #{$i}{
                @each $j,$val2 in $val{
                    #{$j}:$val2;
                }
            }
        }
    }
    @keyframes #{$name}{
        @each $i,$val in $obj{
            #{$i}{
                @each $j,$v in $val{
                    #{$j}:$v;
                }
            }
        }
    }
}

```