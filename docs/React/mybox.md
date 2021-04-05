---
title: mobx
date: 2019-10-05
sidebar: auto
showSponsor: true
categories:
  - react
tags:
  - react
---
## mobx 
1. 安装
```js
yarn add mobx
yarn add mobx-react
```
2. 新建store/store.js
```js
// 在这里定义仓库
import {observable, computed, action, autorun,runInAction,makeObservable} from 'mobx';
// import {observable, computed, action} from 'mobx';
class Store {
    // observable 这是定义初始值的 相当于state
    @observable tradeCfg = {
        'sadf':'sadf'
    };
    @observable baseInfo = {};
    @observable callback = null;
    @observable token = [
        {
            "id":1,
            "name":"YD"
        },
        {
            "id":2,
            "name":"ETH"
        }
    ];
    // action 定义修改observable状态值的  
    // 但是当mobox更新到v6之后必须加下列东西 才会执行函数
    constructor(){
        makeObservable(this)
    }
    @action
    changeR=()=>{
        // 定义的函数修改状态值
        this. tradeCfg = {
        'sadf':'abc'
    };
    }

}
export default Store;
```
3. Router.js 新增加如下代码
```js
import { Provider } from 'mobx-react';
import { observable, useStrict ,autorun} from 'mobx';

import App from './App.js';
import firstStore from './store/first';
// const cnstore = new cnStore();
const stores = {
  first: new firstStore(),
  // ...other stores
};

<Provider {...stores}>
    <App/>
</Provider>

// 完整代码如下：
import React from 'react';

import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { observable, useStrict ,autorun} from 'mobx';

import App from './App.js';
import firstStore from './store/store';
// const cnstore = new cnStore();
const stores = {
  first: new firstStore(),
  // ...other stores
};

const Router = () => (
    <BrowserRouter>
        <Provider {...stores}>
            <App/>
        </Provider>
    </BrowserRouter>
)
export default Router;
```
### mybox 报错
```js
SyntaxError: /Users/hello/workspace/fe.youdeal.io/app/my-app/src/store/otc.js: Support for the experimental syntax 'decorators-legacy' isn't currently enabled (3:5):

  1 | import {observable, computed, action} from 'mobx';
  2 | class Store {
> 3 |     @observable tradeCfg = {
    |     ^
  4 |         'sadf':'sadf'
  5 |     };
  6 |     @observable baseInfo = {};
```
### 以上问题 需安装
1. 安装内容
```js
yarn add @babel/plugin-proposal-decorators
yarn add @babel/plugin-proposal-class-properties
```
### 需添加代码 package.json
2. 在释放文件中
```json
"presets": [
        ["react-app"],
        ["@babel/preset-react"]
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", {"legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }]
]
```
3. event 页面调整 相当于view页面
```js
import React , { Component } from 'react';
import { withRouter,NavLink,Switch,Redirect,Route} from 'react-router-dom';

import {observer,inject} from 'mobx-react';
// 导入需要的模块
@withRouter
@inject('first')
@observer
class View extends Component {
    render(){
        console.log(this.props.first)
        return (
            <React.Fragment>
                <div className="mian">这是event面</div>
                <NavLink to="/">首页</NavLink><br/>
                <NavLink to="/input">表单</NavLink><br/>
                <NavLink to="/event">事件</NavLink>
            </React.Fragment>
        )
    }
}
export default View;
```
### 常见问题
1. MobX 是框架吗?
- MobX 不是一个框架。它不会告诉你如何去组织你的代码，在哪存储状态或者如何处理事件。然而，它可能将你从以性能的名义对你的代码提出各种限制的框架中解放出来。
- MobX简单、可扩展的状态管理

- MobX 是一个经过战火洗礼的库，它通过透明的函数响应式编程(transparently applying functional reactive programming – TFRP)使得状态管理变得简单和可扩展。MobX背后的哲学很简单:

- 任何源自应用状态的东西都应该自动地获得。

- 其中包括UI、数据序列化、服务器通讯，等等。

2. 为什么使用Mobx
- React 和 MobX 是一对强力组合。React 通过提供机制把应用状态转换为可渲染组件树并对其进行渲染。而MobX提供机制来存储和更新应用状态供 React 使用。

### 一些简单的api介绍
1. :状态state

- 组件中的数据。

2. :被观察observable

- 被observable修饰的state数据将会暴露给整个app，各观察者组件都可以根据state值的变化作出响应。

3. :观察者observer

- 被observer修饰的组件，将会根据组件内使用到的被observable修饰的state的变化而自动重新渲染（原理：用autorun包裹了render函数，state变化触发autorun从而自动渲染）

4. :action

- state值的修改需要在action函数中进行。

5. :衍生值computed

- get：基于state值，通过一些计算得到的新值并返回给调用者。

- set：get的相反运算，参数为一个值，由该值进行get函数中的反运算，得到对应的state值并赋予state。

6. :衍生行为autorun

- 基于state的变化而触发的一系列行为（注意：这些行为不改变state值、不产生新的数据），通常为日志记录、请求发送、UI渲染等。