---
title: 问题
date: 2019-09-30
categories:
  - vue
tags:
  - vue
---
## Vue中computed和watch的区别
计算属性computed : 
1. 支持缓存，只有依赖数据发生改变，才会重新进行计算
2. 不支持异步，当computed内有异步操作时无效，无法监听数据的变化
3. computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值
4. 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed
5. 如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。

侦听属性watch：
1. 不支持缓存，数据变，直接会触发相应的操作；
2. watch支持异步；
3. 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
4. 当一个属性发生变化时，需要执行对应的操作；一对多；
5. 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数，
　　immediate：组件加载立即触发回调函数执行，
　　deep: 深度监听，为了发现对象内部值的变化，复杂类型的数据时使用，例如数组中的对象内容的改变，注意监听数组的变动不需要这么做。注意：deep无法监听到数组的变动和对象的新增，参考vue数组变异,只有以响应式的方式触发才会被监听到。

## Vue中更改框架中的样式
- ```/deep/``` 深度修改样式
```css
/deep/.a{

}
```
## 公司中的跨域问题 一般后台用cors 解决 没有的话
- dev环境也可以通过 webpack-dev-server的proxy来解决，开发环境用nginx反代理一下就好了
- https://blog.csdn.net/m0_37631322/article/details/92841290

## 在vue中watch和created哪个先执行？为什么？
- watch 中的 immediate 会让监听在初始值声明的时候去执行监听计算，否则就是 created 先执行
- 在wacth监控数据时，设置immediate：true；会优先执行watch,created后执行;反之则反

## vue中mixins和extends有什么区别？
- extend用于创建vue实例
- mixins可以混入多个mixin，
- extends只能继承一个,mixins类似于面向切面的编程（AOP），extends类似于面向对象的编程,
- 优先级Vue.extend>extends>mixins

## vue中mixins有什么使用场景？
- 一般一些有重复方法的组件，可以考虑抽一个mixin。或者是比如一些页面权限控制的内容，也可以考虑抽一个mixin

## 在vue中created与activated有什么区别？
- created():在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调
- activated()：是在路由设置```<keep-alive></keep-alive>```时，才会有这个生命周期。在被 keep-alive 缓存的组件激活时调用

## 在vue项目如何引入异步组件？
```js
{
path: '/name',
name: 'name',
component: () =>
import('../views/name.vue'),
}
```
## 在vue项目中scss scoped穿透符>>>无效的解决方案有哪些？
- 可以使用 ```/deep/``` 操作符( >>> 的别名)
- ::v-deep

## 为什么在v-for中的key不推荐使用随机数或者index呢？那要怎么使用才比较好呢？
- 因为在插入数据或者删除数据的时候，会导致后面的数据的key绑定的index变化，进而导致从新渲染，效率会降低

## vue-loader在webpack编译流程中的哪个阶段？
- 编译模板阶段：从入口文件出发，调用所有配置的Loader对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理

## 预渲染和SSR(服务端渲染)有什么区别？
- 服务端渲染和预渲染的使用场景还是有较明显的区别的。预渲染的使用场景更多是我们所说的静态页面的形式。服务端渲染适用于大型的、页面数据处理较多且较为复杂的、与服务端有数据交互的功能型网站，一个明显的使用场景就是电商网站。

## 你有用过预渲染技术吗？怎么做的？
- 预渲染的核心是使用 prerender-spa-plugin
- 项目所有的路由，最终生成后有几个页面，都是以这个配置为依据，而不是你在 vue-router 中配置的路由。
  
## 使用vue如何判断页面是否编辑及编辑页面未保存离开时，给出弹窗提示
- 在组件路由beforeRouterLeave中进行判断
- watch() 监听数据变动

## vue的.sync修饰符可以用表达式吗？为什么？
- 带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 v-model。

## v-show指令算是重排吗？
- 当渲染树中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建,因v-show指令改变display的属性，会发生重排。

## axios同时请求多个接口，如果当token过期时，怎么取消后面的请求？
- 使用的 Axios 做数据请求，使用 cancel token 取消请求
- 原生的 XHR 对象是调用 abort()方法取消 ajax 请求

## vue项目中，更改数组元素的值，视图没有实时更新？
```js
export default {
  data(){
    showItems: [false, false, false, false]
  },
  methods: {
    showItem(index) {
      this.showItems[index] = true;
    },
    cancelItem(index) {
      this.showItems[index] = false;
    },
  },
}
```
- 如上代码，定义了showItems数组之后，通过点击按钮触发showItem和cancelItem函数来更改数组元素的值，发现页面上使用showItems数组元素的值并没有刷新，审查元素找到该值，继续触发事件并查看发现元素值没有随着事件的触发而改变
* *****  原因：
- 由于 JavaScript 的限制及Vue实现响应式数据的原理，Vue 不能检测数组和对象的变化，具体原因参考Vue官网，我并没有对此深入理解。
解决方法：
1. this.$forceUpdate()
```js
cancelItem(index) {
      this.showItems[index] = false;
      this.$forceUpdate()
    },
```
2. this.$set(object, propertyName, value)
- 用法：
向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property
```js
 this.$set(this.showItems, index, false)
```
## 你有对 Vue 项目进行哪些优化？
1. 代码层面的优化

- v-if 和 v-show 区分使用场景
- computed 和 watch  区分使用场景
- v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
- 长列表性能优化
- 事件的销毁
- 图片资源懒加载
- 路由懒加载
- 第三方插件的按需引入
- 优化无限列表性能
- 服务端渲染 SSR or 预渲染
2. Webpack 层面的优化

- Webpack 对图片进行压缩-------先引入npm install image-webpack-loader --save-dev，然后在 webpack.config.js 中配置
- 减少 ES6 转为 ES5 的冗余代码
- 提取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 SourceMap
- 构建结果输出分析
- Vue 项目的编译优化
3. 基础的 Web 技术的优化

- 开启 gzip 压缩
- 浏览器缓存
- CDN 的使用
- 使用 Chrome Performance 查找性能瓶颈

## 虚拟 DOM 实现原理
1. 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
2. diff 算法 — 比较两棵虚拟 DOM 树的差异；
3. pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

## 怎么解决vue打包后静态资源图片失效的问题
- 找到config/index.js 配置文件，找build打包对象里的assetsPublicPath属性 默认值为/，更改为./就好了

## 怎么解决vue动态设置img的src不生效的问题？
- 因为动态添加src被当做静态资源处理了，没有进行编译，所以要加上require。
```html
<img :src="require('../../../assets/images/xxx.png')" />
```
## 使用vue渲染大量数据时应该怎么优化？说下你的思路！
- 使用 Object.freeze 方法了，它可以冻结一个对象(注意它不并是 vue 特有的 api)。
