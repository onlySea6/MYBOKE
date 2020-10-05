---
title: vue内置组件
date: 2019-09-20
categories:
 - vue
tags:
 - vue
---

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