---
title: vue路由
date: 2019-09-30
categories:
 - vue
tags:
 - vue
---

## 路由的安装和使用
```js
// router.js
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home";
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home
    }
  ]
});
// main.js
import router from "./router";
new Vue({
  router, // 这里是es6的写法，所以这个名字必须是router，改成别名不会被识别，注意。
  store,
  render: h => h(App)
}).$mount("#app");
```

## 路由的跳转
1. 标签跳转
```js
// 默认<router-link />被渲染成a标签
<router-link to="home">Home</router-link>;
// 对应的就是rputer.js里配置的
new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home
    }
  ]
});
```
2. 编程式导航
```js
// 路由组件里使用$router来访问路由实例
this.$router.push("/news"); // 跳转到新页面
// 对象【常规跳转，对象写法好处是可扩展很多参数进去】
router.push({ path: "home" });
// 命名的路由【params传参不会在地址栏显示】
router.push({ name: "user", params: { userId: "123" } });
// 带查询参数，变成 /register?plan=private【好处是刷新页面参数不丢失】
router.push({ path: "register", query: { plan: "private" } });
// 可以通过$route访问路由信息
//name 和 params 可以一起使用，path 和 params 不可以一起使用

// 使用 router.replace 方法替换
// router.go(n)前进后退

this.$route.path; // 获取到当前路由地址
```
## 路由模式 在index.js中的new VueRouter({mode:''})
1. hash模式(默认) window.location.hash
2. history: 不带#号 history.go()

## 路由传参的方式
1. params 传参
- 父
```js
   //params 有两种方式，
    to="/About/参数1/参数2"
    //通过上面的写法，路由配置中要用占位符
    :to="{name:'About',params:{参数1，参数2}}"
    //第一种参数暴露在地址栏中，第二中，不暴露参数更安全
    //必须用name不用path
```
- 子
```html
<h4>我是App.vue路由传参params：{{ $route.params.aaa }}{{ $route.params.bbb }}</h4>
  <h4>我是App.vue路由传参params：{{ $route.params.id }}</h4>
```
2. query传参
- 发
```js
 <router-link :to="{ path: '/Home', query: { ju: 'zhang',gg：'guang' } }">Home</router-link>
```
- 接
```html
 <h4>我是App.vue路由传参query：{{ $route.query.ju }}{{ $route.query.gg }}</h4>
```
3. 使用 router-view 组件上，动态绑定数据
- 父
```js
 <router-view :mny="mny"></router-view>
```
- 子
```html
 props: {
            mny: { type: [Array, Number] }
        },
```

## 动态路由匹配
```js
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: "/user/:id", component: User }
  ]
});
```
- 获取动态地址部分/:id值
```js
// 在路由组件里使用
this.$route.params.id
// 这里需要注意的是id名称不是死的，是根据咱们配置路由时取得名字，动态路由可以匹配很多个，比如
path: '/user/:id/:age/:job'
// 那获取得时候就得这样写
this.$route.params.id、this.$route.params.age、this.$route.params.job
// 上面获取得就是咱们配置里写的字段名称，不是固定死的，如果是直接在html中，不加this
```
- 监听路由变化
```js
watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
  // or 使用计算属性也可以
computed: {
  id: function(){
    return this.$route.params.id
  }
}
//  使用v2.2 中引入的 beforeRouteUpdate 导航守卫
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
```
