---
title: js 知识 1
date: 2018-02-01
categories:
  - js
tags:
  - js
---

## 语言特点

1.  编译型语言 优点：快 不足：移植性不好
2.  解释性语言 js、php（解释一行读一行） 不足：稍慢 优点：跨平台

## js 的组成部分

1. EcmaScript
2. DOM 文档浏览类型
3. BOM 浏览对象模型

## 什么是主流浏览器

1. 3%的市场占有率
2. 自己独立的内核

## 五大主流浏览器及其四大内核

1. IE 浏览器 Trident 内核
2. Chrome 浏览器 webkit 内核
3. Opera 浏览器 presto 内核
4. Safari 浏览器 webkit 内核
5. Firefox 浏览器 Gecko 内核

## js 数据类型

1. 原始数据类型/值类型/基础数据类型
   -Number 数字
   -Boolean 布尔
   -string 字符串
   -undefined 未定义
   - Null 空
2. 引用数据类型
   - Array 数组
   - Objiec 对象
   - Function 函数
   - .....

## 原始数据类型和引用数据类型的区别是存储位置不一样

- 原始类型->栈（stack） 先进后出
- 应用类型->堆（heap）先进先出

## js中返回false的只有
- ```flase```、 ```0 ```、 ```'' ```、 ``` undefined```、 ```null```、 ```NaN``

## 逻辑运算符
1. &&与 返回第一个假值 或者最后一个真值
2. ||或 返回第一个真值 或者最后一个假值

## while 和 do while 的区别
- while 先判断后执行 do while 先执行后判断(并在条件为真时重复代码)
- 当不满足循环条件时 while 一次都不会执行 do while 至少执行一次

## break和continue
- break 语句“跳出”循环。
- continue 语句“跳过”循环中的一个迭代。

## switch
```js
switch(表达式) {
     case n:
        代码块
        break;
     case n:
        代码块
        break;
     default:
        默认代码块
} 
```
- 计算一次 switch 表达式
- 把表达式的值与每个 case 的值进行对比
- 如果存在匹配，则执行关联代码

## js 运行三部曲

1. 语法解析（全局扫描）
2. 预编译/预解析
3. 解释执行（解释一行执行一行）
