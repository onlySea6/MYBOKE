---
title: vue基础
date: 2019-09-01
categories:
 - vue
tags:
 - vue
---


## 准备工作
  - 需要安装 nodejs,版本为最新稳定版即可
  - 这里咱们用脚手架 3，安装命令：npm i -g @vue/cli
## 创建vue的命令
1. ui 的方式创建：vue ui 
2. cmd 中用命令：vue create 项目名称
![](https://s1.ax1x.com/2020/09/22/wOAb0H.png)

## vue指令大全
1. v-text 值需要在数据中声明作用
```html
类似于{{}}语法
```
2. v-html 
```html
渲染dom片段，底层做了防ssx攻击
```
3. v-show
```html
控制元素显示隐藏，实现原理基于css：display
```
4. v-if
```html
控制元素渲染或销毁，影响元素生命周期，如果频繁切换优先使用v-show
```
5. v-else
```html
配合v-if联动使用，不可以单独使用，原理和js的if-else等价
```
6. v-else-if
```html
同上，v-else-if和v-else只能选一个
```
7. v-for
```html
 用于渲染数据或对象数据，数组参数：item,index；元素上需要加key属性。对象参数：value, name, index
```
8. v-on
```html
用于在元素上绑定事件，简写：@
  修饰符：.stop - 调用 event.stopPropagation()。阻止冒泡
  .prevent - 调用 event.preventDefault()。阻止默认事件
  .capture - 添加事件侦听器时使用 capture 模式。
  .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
  .native - 监听组件根元素的原生事件。
  .once - 只触发一次回调。
  .left - (2.2.0) 只当点击鼠标左键时触发。
  .right - (2.2.0) 只当点击鼠标右键时触发。
  .middle - (2.2.0) 只当点击鼠标中键时触发。
  .passive - (2.3.0) 以 { passive: true } 模式添加侦听器
```
9. v-bind
```html
 用于在元素上绑定属性，简写为 :
```
10. v-model
```html
  用于数据双向绑定，用于表单元素
  修饰符：
  .lazy - 取代 input 监听 change 事件
  .number - 输入字符串转为有效的数字
  .trim - 输入首尾空格过滤
```
11. v-slot
```html
 插槽，简单理解就是模具模板，即我们做好一个个模块，哪儿用插哪儿，和积木一样。
  插槽有匿名插槽和具名插槽；
```
12. v-pre
```html
和原生标签pre一样，具有原格式输出功能。
```
13. v-cloak
```html
防止在渲染期间由于数据初始为空而显示异常，在此期间数据不会显示，知道数据真正存在后显示，这个过程持续到编译结束。
   需要配合css去使用，详情看官网。
```
14. v-once
```html
只渲染元素和组件一次，之后无论数据更新还是生命周期变化都不会影响。
```