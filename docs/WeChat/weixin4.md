---
title: 微信小程序组件
date: 2018-12-05
categories:
  -  微信小程序
tags:
  -  微信小程序
---
## 循环事件传递 index --->  data-name='{{index}}'  接收 获取自定义属性 事件参数对象的e的currentTarget.data

## 组件注册（定义）
1. 要编写一个自定义组件，首先需要在 json 文件中进行自定义组件声明
（将 component 字段设为 true 可将这一组文件设为自定义组件）
```js
//component/swiper/swiper.json
{
  "component": true
}
```
2. 在 wxml 文件中编写组件模板，在 wxss 文件中加入组件样式，它们的写法与页面的写法类似

**在组件wxss中不应使用ID选择器、属性选择器和标签名选择器。
```js
<!-- component/swiper/swiper.wxml 子组件的具体内容 -->
<view class="inner">
  这是子组件内容
</view>
```
3. 使用已注册的自定义组件前，首先要在页面的 json 文件中进行引用声明。
此时需要提供每个自定义组件的标签名和对应的自定义组件文件路径
```js
//  /pages/home/home.js  引用组件的页面
{
    "usingComponents": {
        "Swipe": "../../components/swipe/swipe"
    },
}
```
4. 在页面的 wxml 中就可以像使用基础组件一样使用自定义组件。节点名即自定义组件的标签名，节点属性即传递给组件的属性值
```js
//pages/home/home.wxml  引用组件的页面
<view>
  <Swipe></Swipe>
</view>
```

## 组件通信
 
1. 父组件向子组件传值
 - 父组件wxml中 ``` <自定义组件名称 name="{value}">,并在父组件js的data定义name```
 ```js
<view class="container" style="padding:0px;margin:0px">
  <自定义组件名称 name="我是谁" list="{{list}}"></自定义组件名称>
</view>
 ```
 - 子组件的js中的 ```properties:{name:string} ```接收 在wxml{{name}}渲染
 ```js
Component({
    properties: {
        list: {           // 属性名
            type: Array,  // 类型（必填），目前接受的类型包括：String, Number, Boolean,
            value: [],    // 属性初始值（可选），如果未指定则会根据类型选择一个 ""、[]、{}
            observer(newVal) {
            // 用来监听当前数据变化的，当数据发生变化，他就会执行等价于vue里的watch
                console.log(newVal);
            }
        }
    },
});
 ```

2. 子组件向父组件传值
 - 子组件wxml中定义事件:``` bind:tap='自定义事件名称'```
 ```js
<div bindtap='A' />
 ```
 - 子组件js的 ``` methods:{自定义事件名称(){this.triggerEvent('名称A',值)}}``` //triggerEvent触发自定义事件
 ```js
/*** 组件的方法列表*/
methods: {
  // 点击评论按钮
  A: function (e) {
    this.triggerEvent("B", authorName);
  },
},
 ```
 - 父组件wxmlh中``` <子组件 bind名称A='名称B'>```
```js
 <子组件 bind:B='C'>
```
 - 父组件js中``` 名称B(data){this.setData({获取过来的值data.detail})}```
```js
C(e) {
  this.setData({
    变量: e.detail//接收的新值
  });
},
```

3. 声明组件必须在组件的json文件中配置：
```js
  "component": true,"
```