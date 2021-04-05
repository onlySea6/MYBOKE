---
title: Angular组件通信
date: 2019-02-05
categories:
  -  Angular
tags:
  -  Angular
---
## angular中的生命周期

### angular生命周期函数
- Angular 会按以下顺序执行钩子方法

1. constructor
- 构造函数中除了使用简单的值对局部变量进行初始化之外，什么都不应该做（非生命周期函数）

2. ngOnChanges()
- 当 Angular 设置或重新设置数据绑定的输入属性时响应。 该方法接受当前和上一属性值的 SimpleChanges 对象