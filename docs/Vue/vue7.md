---
title: vue3.0更新
date: 2020-09-24
categories:
 - vue3.0
tags:
 - vue3.0
---
## vue3.0
一.
1)  使用vite 创建vue3.0项目
```js
$ npm init vite-app <项目名name>
$ cd <项目name>
$ npm install
$ npm run dev
//or
yarn create vite-app <项目-name>
$ cd <项目-name>
$ yarn
$ yarn dev
```
2) vue create 项目名 
- npm install @vue/cli -g //要求vue/cli 4.5以上
- 新的vue3.0地址：[vue3.0](https://v3.vuejs.org/guide/installation.html#release-notes)

二. vue3.0路由(下载及其使用)
- 路由地址：[路由](https://next.router.vuejs.org/)
- npm install vue-router@next
 - npm i 
  - src下新建 router/index.js
```js
import {createRouter,createWebHistory} from 'vue-router'
//createWebHistory不带# 路由模式
//src下新建views 创建路由
//引入路由
import Home from '../views/Home.vue'
import About from '../views/About.vue'
//注册路由
const routes= [
    {path:'/',component:Home},
{path:'/abou',component:About}
]
let router= createRouter({
 history:createWebHistory(), //mode路由模式=》history
 routes
})
export default router
```
   - 在main.js注册
      ```js
        import router from './router/index.js'
        let app=createApp(App)
        app.use(router)
        // createApp(App).mount('#app')
        app.mount('#app')
      ```
三. 支持多个根元素 在APP.js中可以有两个div根元素