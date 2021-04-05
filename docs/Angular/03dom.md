---
title: Angular操作dom
date: 2019-02-05
categories:
  -  Angular
tags:
  -  Angular
---

## Angular操作dom

### 操作dom
- 一、原生操作
```ts
  // 组件和指令加载完成 并不是真正的dom加载完成
  // 原生获取dom dom上有指令(ngfor--ngif等)获取不到
ngOnInit(): void {
    //   let ngDom:any=document.getElementById('box')
  }
// 视图加载完成触发的生命周期 dom加载完成了 原生在这里面 操作dom
ngAfterViewInit(): void {
      //   let ngDom:any=document.getElementById('box')
}
```
- 二、ViewChild操作dom
```html
  <!-- 1.给模板中起一个名字 -->
<div #myBox>我是一个dom节点</div>
```
```ts
// 2.引入 ViewChild
import { Component, OnInit, ViewChild } from '@angular/core';
 // 3. 使用ViewChild
export class NewsComponent implements OnInit {
  @ViewChild('myBox') myBox: any;
}
// 4.获取dom
  ngAfterViewInit(): void {
    this.myBox.nativeElement.style.color = 'red';
    this.home.runs();
  }
```
- 三、同理 ViewChild 操作子组件 调用子组件里面的方法
```ts
  ngAfterViewInit(): void {
    // 调用子组件里面 的方法  子组件先定义一个runs函数
    this.home.runs();
  }
```