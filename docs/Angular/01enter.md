---
title: Angular开始
date: 2019-02-05
categories:
  -  Angular 
tags:
  -  Angular
---

## Angular
### 环境搭建（准备工作）
- node.js
- cnpm/npm
- 安装angular脚手架  ---验证 ng v
```js
npm i -g @angular/cli
```

### 创建项目 ie8不兼容angular
```js
ng new 项目名称
```
- 创建项目的时候 有两个选择
1. 第一个选择路由  根据需要
2. 选择css 或者一些预处理器根据自己的需要

### 启动项目
```js
ng serve --open
```
### vscode推荐插件
```js
Angular 10 Snippets - TypeScript, Html, Angular Material, ngRx, RxJS & Flex Layout
```
### 如果创建项目跳过依赖的命令
```js
ng new angulardemo --skip-install
```

### Angular 目录结构
- e2e端对端测试文件 不用管
- src 重中之重
1. app 组件 根目录
2. assets 静态资源
3. main.ts 入口
4. polyfills.ts填充库  例如使用socket.io
5. test.ts测试文件
- node_modules不解释
- package.json不解释
- .browserslistrc 浏览器支持文件
- [目录结构](https://s3.ax1x.com/2021/03/05/6e5LOf.png)
### 自定义组件
- https://cli.angular.io/
#### 创建组件 
1. 使用命令 直接创建
```js
ng g //看服务
```
```js
ng g component components/header //创建组件 之后选择目录
```
2. 这种命令创建出来的组件 不用在app.module.ts引入

3. 使用放在需要的html中 这个名字在组件的header.component.ts 中
```html
<app-header></app-header>
```
4. 模板中绑定数据使用{{}}  在components.ts中定义的属性或者数据 

### 声明属性的几种方式 一共三种
```js
export class HeaderComponent implements OnInit {
  /**
   * 声明属性的几种方式
   * 1.public 共有 默认 可以在这个类里面使用，也可以在类外面使用
   * 2.protected 保护类型  只有在当前类和它的子类里面可以访问
   * 3.private 私有 只有在当前类才可以访问这个属性
   */
  abc = '偷懒写的';
  title: any = '我是一个头部组件';
  public titles: string = '我是一个头部组件'; //推荐使用这样的定义属性的方式
  // 声明对象
  public userInfo: object = {
    usename: 'wangjie',
    age: 23,
  };
  // 声明一个变量
  public free: any;

  public content: any = '<h5>我是一个html标签</h5>';

  // 定义一个数组 的三种方式
  public arr = ['111', '222', '333'];
  public arrs: any[] = ['111', '222', '333']; //推荐
  public arra:Array<any> = ['111', '222', '333'];
  constructor() {
    this.free = '改变属性的值';
  }
  ngOnInit(): void {}
}
```
### 绑定属性
```html
<h1>模板里面绑定数据</h1>
<p>header works! {{title}}</p>
<br>

<h1>模板里面绑定属性</h1>
<div title="我是一个div">
   静态属性 
</div>
<div [title]="abc">
动态绑定属性
</div>

<hr>
<h1>模板里面绑定html 标签</h1>
<span [innerHtml]="content" class="red"></span>
<hr>
<h1>模板里面允许做一些简单的运算</h1>
1+2={{1+2}}

```
### 循环数据 *ngFor
```html
<!-- arr 即为数据 item即为数据的每一项-->
<!-- 如果数据层数较多 可以直接多次嵌套循环 -->
<ul>
       <!-- key即为数据的索引 -->
    <li *ngFor="let item of arr;let key=index">
      {{key}}  {{item}}
    </li>
</ul>
```
### 条件判断 *ngIf
```html
<div *ngIf="falg">
666
</div>
<!-- 取反 -->
<div *ngIf="!falg">
  666
</div>
<!-- ngfor 结合ngif 写成else -->
<ul>
    <li *ngFor="let item of arr;let key=index">
      <span *ngIf="key==1" class="red"> {{key}} {{item}}</span>
      <span *ngIf="key!=1" class="blue"> {{key}} {{item}}</span>
    </li>
</ul>
```
### 条件判断 *ng
```html
<div <span [ngSwitch]="ok">
<p *ngSwitchCase="1">

</p>
<p *ngSwitchCase="2">

</p>
<p *ngSwitchDefault>

</p>
```
### 元素绑定属性 ngClass 
```html
<!-- red 你自己定义的属性 true显示与否 -->
<a href="" [ngClass]="{'red': false,'blue':true}"> 5555</a>

<!-- ngclass 与循环的结合 -->
<li *ngFor="let item of arr;let key=index" [ngClass]="{'red': key===0}">
   {{key}} {{item}}
 </li>
```
### 元素绑定样式
```html
<p [ngStyle]="{'color': 'orange'}">6666</p>
```


### 管道
1. 大小写转换
```js
<p>{{str | uppercase}}</p>//转换成大写
<p>{{str | lowercase}}</p>//转换成小写
```
2.  日期格式转换
```js
<p>{{today | date:'yyyy-MM-dd HH:mm:ss' }}</p> 
```
3. 小数位数
```js
//接收的参数格式为{最少整数位数}.{最少小数位数}-{最多小数位数}
//保留2~4位小数

<p>{{p | number:'1.2-4'}}</p> 
```
4. JavaScript 对象序列化
```js
<p>{{ { name: 'semlinker' } | json }}</p> <!-- Output: { "name": "semlinker" } -->
```
5. slice
```js
<p>{{ 'semlinker' | slice:0:3 }}</p> <!-- Output: sem -->
```
6. 管道链
```js
<p>{{ 'semlinker' | slice:0:3 | uppercase }}</p> <!-- Output: SEM -->
```
7. 自定义管道
- 自定义管道的步骤：

* 使用 @Pipe 装饰器定义 Pipe 的 metadata 信息，如 Pipe 的名称 - 即 name 属性

* 实现 PipeTransform 接口中定义的 transform 方法

7.1 WelcomePipe 定义

```js
import { Pipe, PipeTransform } from '@angular/core';
[@Pipe](/user/Pipe)({ name: 'welcome' })
export class WelcomePipe implements PipeTransform {
  transform(value: string): string {
    if(!value) return value;
    if(typeof value !== 'string') {
      throw new Error('Invalid pipe argument for WelcomePipe');
    }
    return "Welcome to " + value;
  }
} 
```
1.2 WelcomePipe 使用
```js
<div>
   <p ngNonBindable>{{ 'semlinker' | welcome }}</p>
   <p>{{ 'semlinker' | welcome }}</p> <!-- Output: Welcome to semlinker -->
</div>
```
2.1 RepeatPipe 定义
```js
import {Pipe, PipeTransform} from '@angular/core';
[@Pipe](/user/Pipe)({name: 'repeat'})
export class RepeatPipe implements PipeTransform {
    transform(value: any, times: number) {
        return value.repeat(times);
    }
}
```
2.2 RepeatPipe 使用
```js
<div>
   <p ngNonBindable>{{ 'lo' | repeat:3 }}</p>
   <p>{{ 'lo' | repeat:3 }}</p> <!-- Output: lololo -->
</div>
```