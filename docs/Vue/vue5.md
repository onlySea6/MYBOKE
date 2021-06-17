---
title: vue路由
date: 2019-09-30
categories:
 - vue
tags:
 - vue
---

## 路由的安装和使用
## 创建项目如果没安装 安装-->yarn add vue-router
配置路由
```js
  //1. 新建路由文件 router.js
// router.js
import Vue from "vue";
import VueRouter from "vue-router";
const Home = ()=>import('../views/Home.vue') //路由懒加载
import store from '../store/index'
const No=()=>import('../views/Not.vue')
// 安装路由
Vue.use(VueRouter);

 const routes=[
    { path: '*',component:No },
    {path:'/' ,redirect:'/home'},
    {
        path: "/home",
        component: Home,
        meta:{
            isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
          }
    },
    {
        path:'/login',
        component:require('../views/Login.vue').default
    },
    {
        path:'/reg',
        component:require('../views/Reg.vue').default
    }
  ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  })
router.beforeEach((to,from,next)=>{
    if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
        if (store.state.islogin) {
            next();
        }else{
            next({
                path:"/login"
            });
        }

    }else{
        next()
    }
})
export default  router
// 2. 引入路由文件 并将路由挂载到Vue实例上
import router from "./router";
new Vue({
  router, // 这里是es6的写法，所以这个名字必须是router，改成别名不会被识别，注意。
  store,
  render: h => h(App)
}).$mount("#app");

// 3. 路由出口放在指定位置 不如APP.vue
<template>
  <div id="app">
    <keep-alive>   //组件缓存缓存
        <router-view /> //路由出口
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {
  }
}
</script>
<style></style>

```
## 全局前置守卫 在 export default 之前守卫

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // to：要进入的目标路由对象
  // from：当前导航正要离开的路由对象
  // next：这个函数必须调用，否则导航会报错，并阻塞在这里
})
```

- next(false): 中断当前的导航。
- next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
- next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，
  则导航会被终止且该错误会被传递给 router.onError() 注册过的回调

## 组件内的守卫

- beforeRouteEnter
- beforeRouteUpdate (2.2 新增)
- beforeRouteLeave

```js
export default {
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
};
```

## 路由的跳转
1. 标签跳转
```js
// 默认<router-link />被渲染成a标签
<router-link to="/home">Home</router-link>;
// 对应的就是router.js里配置的
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
## 使用element-ui 
1. 先安装 yarn add element-ui -S
2. 在main.js中
```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```
3. 直接使用

## 路由的权限控制
1. 通过router.beforeEach() 路由拦截的方式实现。
```js
//路由表有
const router = new Router({
  routes: [{
        path: '/',
        redirect: '/index1'
    }, {
        path: '/index1',
        name: 'Index1',
        component: Index1
    }, {
        path: '/index2',
        name: 'Index2',
        component: Index2
    }, {
        path: '/index3',
        name: 'Index3',
        component: Index3
    }]
})
// 在 router/index 中，通过router.beforeEach() 路由拦截去进行权限判断：

router.beforeEach((to, from, next) => {
    //to: 从哪个路由来
    //from: 去哪个路由
    //next：是一个方法，使用路由拦截，必须在后面添加next()，否则路由无法跳转

    //假设我们从后台获取的权限为：
    const list = ['index1', 'index2'];

    //如果没有匹配到，证明没有权限
    if(list.indexOf(to.name) === -1) {
        //next('/login');

        ... //或者执行其他操作
    }

    //路由拦截可根据项目返回的权限自行调整，这里只是做了一个简单的例子
})
export default router;
```
2. 通过vue-router 官方提供的addRoutes()来进行动态路由注入，注意 该方法只有vue-router的版本 >= 2.2才有效。
```js
// 1. 需要配置静态的路由表，比如登录、注册页，其他路由通过动态注入
const router = new Router({
  routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }]
})

export default router;
// 2. 假设我们在 登录 的时候，后端返回的权限列表如下：
//leaf: 是我们用来判断是否唯一的
//component：一般来说后端返回给我们的就是一个路径而已，所以我们需要自行的去加载组件
export const routers = [{
    path: '/main',
    name: 'main',
    leaf: false,
    component: 'pages/main',
    children: [{
        path: '/main/index1',
        name: 'index1',
        component: 'pages/index1',
        leaf: true
    }, {
        path: '/main/index2',
        name: 'index2',
        component: 'pages/index2',
        leaf: true
    }, {
        path: '/main/index3',
        name: 'index3',
        component: 'pages/index3',
        leaf: true
    }, {
        path: '/main/index4',
        name: 'index4',
        component: 'pages/index4',
        leaf: true
    }]
}, {
    path: '*',
    component: 'pages/noFind',
    leaf: true
}]
// 可以写个方法去再次过滤返回回来的路由列表
/**
 * @param routers 初始数据，为数组格式，一般来说是个空数组
 * @param data 后端返回的路由列表数据
 */
function generaMenu(routers, data) {
  data.forEach((item)=>{
    let menu = Object.assign({},item);
    menu.component = import(`@/${menu.component}.vue`);
    if(!item.leaf) {
      menu.children = [];
      generaMenu(menu.children,item.children);
        menu.redirect = menu.children[0].path; //如果需要重定向的话，可以根据自己的需求进行选择
    }
    routers.push(menu);
  })
}
```
* 注意 如果有用到404的路由话，需要把404这个路由放到整个路由表的最后一个，否则，因为一开始我们是没有对应的动态路由，默认就跳转到了404页面了，所以静态路由表不配置404路由，与动态路由一起注入到路由表中。

- 然后通过 addRoutes() 这个方法把路由给注入到路由表里面，之后就可以访问已注入的路由了：

* 这个方法路由会一直累加上去所以对router/index 进行改造一下：
```js
const createRouter = () => new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }]
})

const router = createRouter()

//重新实例化一个新的路由表，替换之前的路由表，然后将这个方法导出
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // the relevant part
}
// 在用户退出的时候，重新执行下 resetRouter() 这个方法就可以重新初始化静态路由表
```
## 什么是 SPA 单页面，它的优缺点分别是什么
- SPA（ single-page application ）即一个web项目就只有一个页面（即一个HTML文件,HTML 内容的变换是利用路由机制实现的。
- 仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载
* 优点：
1. 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
2. 基于上面一点，SPA 相对对服务器压力小；
3. 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
* 缺点
1. 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
2. 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
3. SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。