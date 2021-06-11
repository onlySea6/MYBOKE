---
title: vue内置组件
date: 2019-09-20
categories:
 - vue
tags:
 - vue
---

## Vue中内置的组件有以下几种：

1. component
2. transition
3. transition-group
4. keep-alive
5. slot
- component组件：有两个属性---is    inline-template

渲染一个‘元组件’为动态组件，按照'is'特性的值来渲染成那个组件
- transition组件：为组件的载入和切换提供动画效果，具有非常强的可定制性，支持16个属性和12个事件
- transition-group：作为多个元素/组件的过渡效果
- keep-alive：包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
- slot：作为组件模板之中的内容分发插槽，slot元素自身将被替换   `<slot name=""></slot>`

## keep-alive【缓存组件】
```html
Props：
include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
max - 数字。最多可以缓存多少组件实例。
用法：
<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。

```
```js
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```
## 异步按需加载组件
```js
// 路由异步加载组件
const Foo = () => import("./Foo.vue");
// 组件异步加载，就是说，当我们用到组件的时候再加载
new Vue({
  // ...
  components: {
    "my-component": () => import("./my-async-component")
  }
});
```
## vue 中使用 echarts
1. 下载 安装echarts
```js
yarn add echarts 
```
2. 在main.js全局注册
```js
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;
```
3. 在组件中定义一个容器
```html
 <div id="myChart" style="width: 90%;height: 400px;"> </div>
```
4. 将数据都挂载到上面
```js
 mounted(){
      this.oks()
  },
methods: {
      oks(){
           let myChart = this.$echarts.init(document.getElementById('myChart'))
           myChart.setOption(this.option)
      }
  },
//   this.option 即为要挂在的内容
```