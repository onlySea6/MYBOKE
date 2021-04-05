---
title: Angular组件通信
date: 2019-02-05
categories:
  -  Angular
tags:
  -  Angular
---

## 组件通信

### 父组件给子组件传值
1.  父组件定义要传的值
```ts
public father:any='父亲给的值'
```
2. 绑定给子组件
```ts
 <app-to-list [title]="father"></app-to-list>
```
3. 子组件使用 Input装饰器 引入接收
```ts
import { Component, OnInit,Input } from '@angular/core';
// 接收父组件传过来的数据
  @Input() title:any
```
### 同理父组件传递给子组件的方法
1. 父组件定义要传的值
```ts
 father() {
        alert('父组件的方法')
    }
```
2. 绑定方法  传的时候也可以传当前组件的this 一样调用
```ts
 <app-to-list  [father]="father"></app-to-list>
```
3. 还是用 Input 接收
```ts
 @Input() father:any
 getFather() {
    //   执行父组件的方法
      this.father()
  }
```
```html
<button (click)="getFather()">执行父组件的方法</button>
```

### 父组件通过@ViewChild主动获取子组件的数据和方法
1. 在子组件中定义数据
```ts
 public child:any="我是子组件的数据"
```
2. 子组件定义值
```html
 <app-to-list  #son></app-to-list>
```
3. 使用 装饰器 viewChild 获取子组件的值
```ts
import { Component,ViewChild } from '@angular/core';

@ViewChild('son') son:any

console.log(this.son.child);
```
### 子组件通过@OUtput触发父组件的方法 (了解 一下 不常用)
1. 子组件引入Output和EventEmitter
```ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
```
2. 子组件中实例化EventEmistter
```ts
@Output() private outer=new  EventEmistter<string>()
// 用EventEmistter 和output装饰器配合使用  <string>指定类型变量
```
3. 子组件通过EventEmistter对象outer实例广播数据
```ts
sendParen(){
    // alert("zhixing")
    this.outer.emit('msg from child')
}
```
4. 父组件调用子组件的时候，定义接收事件，outer就是子组件的EventEmistter对象outer
```ts
<app-header (outer)="runParent($event)"></app-header>
```
5.父组件接收的函数回调用自己的runParent方法，这个时候就能拿到子组件的数据
```ts
// 接收子组件传递过来的数据
runParent(msg:string){
  alert(msg)
}
```
